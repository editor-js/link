/**
 * @typedef {object} LinkToolData
 * @description Link Tool's input and output data format
 * @property {string} link — data url
 * @property {metaData} meta — fetched link data
 */

/**
 * @typedef {object} metaData
 * @description Fetched link meta data
 * @property {string} image - link's meta image
 * @property {string} title - link's meta title
 * @property {string} description - link's description
 */

/**
 * @typedef {object} LinkToolConfig
 * @property {string} endpoint - the endpoint for link data fetching
 * @property {object} headers - the headers used in the GET request
 * @property {boolean} createOnPaste - true to catch non-image pasted links and create a preview automatically
 * @property {string} key - Required if createOnPaste is true - must match the tool key, i.e. the key used in the editorjs config
 */

import './index.css';
import 'url-polyfill';
import ajax from '@codexteam/ajax';
import { IconLink } from '@codexteam/icons';
import { isVideoLink } from './videoLink';

const noPreviewIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" fill="currentColor"><path d="M480-285q-80 0-143-43t-92-112q19-46 54.5-80.5T382-575l39 39q-38 11-69.5 36T300-440q27 49 75 77t105 28q30 0 58.5-8t52.5-23l35 35q-31 22-68 34t-78 12Zm191-86-35-35q7-8 13-16.5t11-17.5q-25-45-67.5-72T498-544l-49-49q85-11 159 31.5T715-440q-8 20-19 37t-25 32ZM815-56l-64-64H180q-25 0-42.5-17.5T120-180v-571l-54-54 43-43L858-99l-43 43ZM180-180h511L180-692v512Zm660-22-60-60v-421H359L202-840h578q25 0 42.5 17.5T840-780v578Z"/></svg>';

/**
 * @typedef {object} UploadResponseFormat
 * @description This format expected from backend on link data fetching
 * @property {number} success  - 1 for successful uploading, 0 for failure
 * @property {metaData} meta - Object with link data.
 *
 * Tool may have any data provided by backend, currently are supported by design:
 * title, description, image, url
 */
export default class LinkTool {
  /**
   * Notify core that read-only mode supported
   *
   * @returns {boolean}
   */
  static get isReadOnlySupported() {
    return true;
  }

  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   *
   * @returns {{icon: string, title: string}}
   */
  static get toolbox() {
    return {
      icon: IconLink,
      title: 'Link',
    };
  }

  /**
   * Allow to press Enter inside the LinkTool input
   *
   * @returns {boolean}
   * @public
   */
  static get enableLineBreaks() {
    return true;
  }

  /**
   * Available image tools
   *
   * @returns {Array}
   */
  static get tunes() {
    return [
      {
        name: 'urlOnly',
        icon: noPreviewIcon,
        title: 'Remove preview',
      },
    ];
  }

  /**
   * @param {object} options - Tool constructor options fot from Editor.js
   * @param {LinkToolData} options.data - previously saved data
   * @param {LinkToolConfig} options.config - user config for Tool
   * @param {import('@editorjs/editorjs').API} options.api - Editor.js API
   * @param {boolean} options.readOnly - read-only mode flag
   */
  constructor({ data, config, api, readOnly }) {
    this.api = api;
    this.readOnly = readOnly;

    /**
     * Tool's initial config
     */
    this.config = {
      ...config,
      endpoint: config.endpoint || '',
      headers: config.headers || {},
    };

    this.nodes = {
      wrapper: null,
      container: null,
      progress: null,
      input: null,
      inputHolder: null,
      linkContent: null,
      linkImage: null,
      linkInfos: null,
      linkTitle: null,
      linkDescription: null,
      linkText: null,
    };

    this._data = {
      link: '',
      meta: {},
    };

    this.data = data;

    if (config.createOnPaste) {
      this.api.listeners.on(
        this.api.ui.nodes.wrapper,
        'paste',
        this.handlePaste.bind(this)
      );

      // If a block was programmatically created with a link, start fetching
      setTimeout(() => {
        if (data.link) {
          this.nodes.input.textContent = data.link;
          this.startFetching({}, true);
        }
      });
    }
  }

  /**
   * Renders Block content
   *
   * @public
   *
   * @returns {HTMLDivElement}
   */
  render() {
    this.nodes.wrapper = this.make('div', this.CSS.baseClass);
    this.nodes.container = this.make('div', this.CSS.container);
    this.nodes.container = this.make('div', [this.CSS.container, 'not-prose']);

    this.nodes.inputHolder = this.makeInputHolder();
    this.nodes.linkContent = this.prepareLinkPreview();

    /**
     * If Tool already has data, render link preview, otherwise insert input
     */
    if (Object.keys(this.data.meta).length) {
      this.nodes.container.appendChild(this.nodes.linkContent);
      this.showLinkPreview(this.data.meta);
    } else {
      this.nodes.container.appendChild(this.nodes.inputHolder);
    }

    this.nodes.wrapper.appendChild(this.nodes.container);

    return this.nodes.wrapper;
  }

  /**
   * Return Block data
   *
   * @public
   *
   * @returns {LinkToolData}
   */
  save() {
    return this.data;
  }

  /**
   * Validate Block data
   * - check if given link is an empty string or not.
   *
   * @public
   *
   * @returns {boolean} false if saved data is incorrect, otherwise true
   */
  validate() {
    return this.data.link.trim() !== '';
  }

  /**
   * Stores all Tool's data
   *
   * @param {LinkToolData} data - data to store
   */
  set data(data) {
    this._data = Object.assign(
      {},
      {
        link: data.link || this._data.link,
        meta: data.meta || this._data.meta,
      }
    );
  }

  /**
   * Return Tool data
   *
   * @returns {LinkToolData}
   */
  get data() {
    return this._data;
  }

  /**
   * @returns {object} - Link Tool styles
   */
  get CSS() {
    return {
      baseClass: this.api.styles.block,
      input: this.api.styles.input,

      /**
       * Tool's classes
       */
      container: 'link-tool',
      inputEl: 'link-tool__input',
      inputHolder: 'link-tool__input-holder',
      inputError: 'link-tool__input-holder--error',
      linkContent: 'link-tool__content',
      linkContentRendered: 'link-tool__content--rendered',
      linkImage: 'link-tool__image',
      linkInfos: 'link-tool__infos',
      linkTitle: 'link-tool__title',
      linkDescription: 'link-tool__description',
      linkText: 'link-tool__anchor',
      progress: 'link-tool__progress',
      progressLoading: 'link-tool__progress--loading',
      progressLoaded: 'link-tool__progress--loaded',
    };
  }

  /**
   * Prepare input holder
   *
   * @returns {HTMLElement}
   */
  makeInputHolder() {
    const inputHolder = this.make('div', this.CSS.inputHolder);

    this.nodes.progress = this.make('label', this.CSS.progress);
    this.nodes.input = this.make('div', [this.CSS.input, this.CSS.inputEl], {
      contentEditable: !this.readOnly,
    });

    this.nodes.input.dataset.placeholder = this.api.i18n.t('Link');

    if (!this.readOnly) {
      this.nodes.input.addEventListener('paste', (event) => {
        this.startFetching(event);
      });

      this.nodes.input.addEventListener('keydown', (event) => {
        const [ENTER, A] = [13, 65];
        const cmdPressed = event.ctrlKey || event.metaKey;

        switch (event.keyCode) {
          case ENTER:
            event.preventDefault();
            event.stopPropagation();

            this.startFetching(event);
            break;
          case A:
            if (cmdPressed) {
              this.selectLinkUrl(event);
            }
            break;
        }
      });
    }

    inputHolder.appendChild(this.nodes.progress);
    inputHolder.appendChild(this.nodes.input);

    return inputHolder;
  }

  /**
   * Activates link data fetching by url
   *
   * @param {PasteEvent|KeyboardEvent} event - fetching could be fired by a pase or keydown events
   * @param {boolean} fallbackToText if true and the fetch fails, falls back to rendering a paragraph block with the raw link instead of a link block with a failure.
   */
  startFetching(event, fallbackToText) {
    let url = this.nodes.input.textContent;

    if (event.type === 'paste') {
      url = (event.clipboardData || window.clipboardData).getData('text');
    }

    this.removeErrorStyle();
    this.fetchLinkData(url, fallbackToText);
  }

  /**
   * If previous link data fetching failed, remove error styles
   */
  removeErrorStyle() {
    this.nodes.inputHolder.classList.remove(this.CSS.inputError);
    this.nodes.inputHolder.insertBefore(this.nodes.progress, this.nodes.input);
  }

  /**
   * Select LinkTool input content by CMD+A
   *
   * @param {KeyboardEvent} event - keydown
   */
  selectLinkUrl(event) {
    event.preventDefault();
    event.stopPropagation();

    const selection = window.getSelection();
    const range = new Range();

    const currentNode = selection.anchorNode.parentNode;
    const currentItem = currentNode.closest(`.${this.CSS.inputHolder}`);
    const inputElement = currentItem.querySelector(`.${this.CSS.inputEl}`);

    range.selectNodeContents(inputElement);

    selection.removeAllRanges();
    selection.addRange(range);
  }

  /**
   * Prepare link preview holder
   *
   * @returns {HTMLElement}
   */
  prepareLinkPreview() {
    const holder = this.make('a', this.CSS.linkContent, {
      target: '_blank',
      rel: 'nofollow noindex noreferrer',
    });

    this.nodes.linkImage = this.make('div', this.CSS.linkImage);
    this.nodes.linkInfos = this.make('div', this.CSS.linkInfos);
    this.nodes.linkTitle = this.make('div', this.CSS.linkTitle);
    this.nodes.linkDescription = this.make('p', this.CSS.linkDescription);
    this.nodes.linkText = this.make('span', this.CSS.linkText);

    return holder;
  }

  /**
   * Compose link preview from fetched data
   *
   * @param {metaData} meta - link meta data
   */
  showLinkPreview({ image, title, description }) {
    this.nodes.container.appendChild(this.nodes.linkContent);

    if (image && image.url) {
      this.nodes.linkImage.style.backgroundImage = 'url(' + image.url + ')';
      this.nodes.linkContent.appendChild(this.nodes.linkImage);
    }

    if (title) {
      this.nodes.linkTitle.textContent = title;
      this.nodes.linkInfos.appendChild(this.nodes.linkTitle);
    }

    if (description) {
      this.nodes.linkDescription.textContent = description;
      this.nodes.linkInfos.appendChild(this.nodes.linkDescription);
    }

    this.nodes.linkText.textContent = this.data.link;
    this.nodes.linkInfos.appendChild(this.nodes.linkText);

    this.nodes.linkContent.classList.add(this.CSS.linkContentRendered);
    this.nodes.linkContent.setAttribute('href', this.data.link);
    this.nodes.linkContent.appendChild(this.nodes.linkInfos);
  }

  /**
   * Show loading progress bar
   */
  showProgress() {
    this.nodes.progress.classList.add(this.CSS.progressLoading);
  }

  /**
   * Hide loading progress bar
   *
   * @returns {Promise<void>}
   */
  hideProgress() {
    return new Promise((resolve) => {
      this.nodes.progress.classList.remove(this.CSS.progressLoading);
      this.nodes.progress.classList.add(this.CSS.progressLoaded);

      setTimeout(resolve, 500);
    });
  }

  /**
   * If data fetching failed, set input error style
   */
  applyErrorStyle() {
    this.nodes.inputHolder.classList.add(this.CSS.inputError);
    this.nodes.progress.remove();
  }

  /**
   * Sends to backend pasted url and receives link data
   *
   * @param {string} url - link source url
   * @param {boolean} fallbackToText if true and the fetch fails, falls back to rendering a paragraph block with the raw link instead of a link block with a failure.
   */
  async fetchLinkData(url, fallbackToText) {
    this.showProgress();
    this.data = { link: url };

    try {
      const { body } = await ajax.get({
        url: this.config.endpoint,
        headers: this.config.headers,
        data: {
          url,
        },
      });

      this.onFetch(body);
    } catch (error) {
      if (fallbackToText) {
        this.replaceBlockWithParagraph();
      } else {
        this.fetchingFailed(this.api.i18n.t("Couldn't fetch the link data"));
      }
    }
  }

  /**
   * Replace this link block with a standard paragraph (text) block. Example: as a fallback for pasted URLs which fetch failed.
   */
  replaceBlockWithParagraph() {
    const newBlock = this.api.blocks.insert(
      'paragraph',
      { text: this.nodes.input.textContent },
      undefined,
      this.api.blocks.getCurrentBlockIndex(),
      true,
      true
    );

    this.api.caret.setToBlock(newBlock.id);
    this.api.toolbar.toggleBlockSettings(false);
  }

  /**
   * Link data fetching callback
   *
   * @param {UploadResponseFormat} response - backend response
   */
  onFetch(response) {
    if (!response || !response.success) {
      this.fetchingFailed(
        this.api.i18n.t("Couldn't get this link data, try the other one")
      );

      return;
    }

    const metaData = response.meta;

    const link = response.link || this.data.link;

    this.data = {
      meta: metaData,
      link,
    };

    if (!metaData) {
      this.fetchingFailed(
        this.api.i18n.t('Wrong response format from the server')
      );

      return;
    }

    this.hideProgress().then(() => {
      this.nodes.inputHolder.remove();
      this.showLinkPreview(metaData);
    });
  }

  /**
   * Handle link fetching errors
   *
   * @private
   *
   * @param {string} errorMessage - message to explain user what he should do
   */
  fetchingFailed(errorMessage) {
    this.api.notifier.show({
      message: errorMessage,
      style: 'error',
    });

    this.applyErrorStyle();
  }

  /**
   * Helper method for elements creation
   *
   * @param {string} tagName - name of creating element
   * @param {string|string[]} [classNames] - list of CSS classes to add
   * @param {object} [attributes] - object with attributes to add
   * @returns {HTMLElement}
   */
  make(tagName, classNames = null, attributes = {}) {
    const el = document.createElement(tagName);

    if (Array.isArray(classNames)) {
      el.classList.add(...classNames);
    } else if (classNames) {
      el.classList.add(classNames);
    }

    for (const attrName in attributes) {
      el[attrName] = attributes[attrName];
    }

    return el;
  }

  /**
   * Custom paste handler, so that we can choose more accurately whether it should catch the paste or not.
   *
   * @param {PasteEvent | KeyboardEvent} event the paste event
   */
  handlePaste(event) {
    const pasteConfig = {
      patterns: {
        embed: /^(?!.*\.(?:gif|jpe?g|tiff|png)(?:\?|$))https?:\/\/\S+$/i,
      },
    };
    const patterns = pasteConfig.patterns;
    const url = (event.clipboardData || window.clipboardData).getData('text');

    if (!url) {
      return;
    }

    const currentBlock = this.api.blocks.getBlockByIndex(
      this.api.blocks.getCurrentBlockIndex()
    );
    const isParagraph = currentBlock.name === 'paragraph';
    const isCurrentBlockEmpty = currentBlock.isEmpty;
    const shouldDisplayEmbedLink =
      patterns.embed.test(url) && !isVideoLink(url);

    if (shouldDisplayEmbedLink && isParagraph && isCurrentBlockEmpty) {
      event.preventDefault(); // Prevent the default paste behavior
      this.insertPastedBlock(url);
    }
  }

  /**
   * Insert a link block
   *
   * @param {string} link the URL to include in the created link block
   */
  insertPastedBlock(link) {
    const pluginName = this.getPluginName();

    this.api.blocks.insert(
      pluginName,
      { link },
      undefined,
      this.api.blocks.getCurrentBlockIndex(),
      true,
      true
    );
    setTimeout(() => {
      this.api.toolbar.toggleBlockSettings(true);
    });
  }

  /**
   * Get the name of the plugin dynamically from the Editor.js configuration.
   * Ideally, we should get it dynamically without requiring the user to provide a config, but I haven't found how to do that.
   *
   * @returns {string} The name of the plugin
   */
  getPluginName() {
    if (!this.config.key) {
      throw new Error(
        `You need to provide the tool key in the plugin config, e.g. { linkTool: { class: LinkTool, config: { key: 'linkTool' } } }`
      );
    }

    return this.config.key;
  }

  /**
   * Returns configuration for block tunes: remove the preview and keep the URL only
   *
   * @public
   *
   * @returns {Array}
   */
  renderSettings() {
    // Merge default tunes with the ones that might be added by user
    // @see https://github.com/editor-js/image/pull/49
    const tunes =
      this.config.actions && this.config.createOnPaste
        ? LinkTool.tunes.concat(this.config.actions)
        : LinkTool.tunes;

    return tunes.map((tune) => ({
      icon: tune.icon,
      label: this.api.i18n.t(tune.title),
      name: tune.name,
      toggle: tune.toggle,
      isActive: this.data[tune.name],
      onActivate: () => {
        /* If it'a user defined tune, execute it's callback stored in action property */
        if (typeof tune.action === 'function') {
          tune.action(tune.name);

          return;
        }

        if (tune.name === 'urlOnly') {
          this.replaceBlockWithParagraph();
        }
      },
    }));
  }
}
