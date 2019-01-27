/**
 * @typedef {object} LinkToolData
 * @description Link Tool's input and output data format
 * @property {string} link — data url
 * @property {object} linkData — fetched link data
 */

// eslint-disable-next-line
import css from './index.css';
import ToolboxIcon from './svg/toolbox.svg';
import ajax from '@codexteam/ajax';

/**
 * @typedef {object} UploadResponseFormat
 * @description This format expected from backend on link data fetching
 * @property {number} success  - 1 for successful uploading, 0 for failure
 * @property {object} linkData - Object with link data.
 *                           tool may have any data provided by backend,
 *                           currently are supported by design:
 *                              - title
 *                              - description
 *                              - image
 *                              - url
 */
export default class LinkTool {
  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   *
   * @return {{icon: string, title: string}}
   */
  static get toolbox() {
    return {
      icon: ToolboxIcon,
      title: 'Link'
    };
  }

  /**
   * Allow to press Enter inside the LinkTool input
   * @returns {boolean}
   * @public
   */
  static get enableLineBreaks() {
    return true;
  }

  /**
   * @param {LinkToolData} data - previously saved data
   * @param {config} config - user config for Tool
   * @param {object} api - CodeX Editor API
   */
  constructor({data, config, api}) {
    this.api = api;

    /**
     * Tool's initial config
     */
    this.config = {
      endpoint: config.endpoint || ''
    };

    this.nodes = {
      wrapper: null,
      container: null,
      progress: null,
      input: null,
      inputHolder: null,
      linkContent: null,
      linkImage: null,
      linkTitle: null,
      linkDescription: null,
      linkText: null
    };

    this.data = data;
  }

  /**
   * Renders Block content
   * @public
   *
   * @return {HTMLDivElement}
   */
  render() {
    this.nodes.wrapper = this.make('div', this.CSS.baseClass);
    this.nodes.container = this.make('div', this.CSS.container);

    this.nodes.inputHolder = this.makeInputHolder();
    this.nodes.linkContent = this.prepareLinkPreview();

    /**
     * If Tool already has data, render link preview, otherwise insert input
     */
    if (Object.keys(this.data.linkData).length) {
      this.nodes.container.appendChild(this.nodes.linkContent);
      this.showLinkPreview(this.data.linkData);
    } else {
      this.nodes.container.appendChild(this.nodes.inputHolder);
    }

    this.nodes.wrapper.appendChild(this.nodes.container);

    return this.nodes.wrapper;
  }

  /**
   * Return Block data
   * @public
   *
   * @return {LinkToolData}
   */
  save() {
    return this.data;
  }

  /**
   * Stores all Tool's data
   * @param {LinkToolData} data
   */
  set data(data) {
    this._data = Object.assign({}, {link: data.link || '', linkData: data.linkData || {}});
  }

  /**
   * Return Tool data
   * @return {LinkToolData} data
   */
  get data() {
    return this._data;
  }

  /**
   * @return {object} - Link Tool styles
   * @constructor
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
      linkTitle: 'link-tool__title',
      linkDescription: 'link-tool__description',
      linkText: 'link-tool__anchor',
      progress: 'link-tool__progress',
      progressLoading: 'link-tool__progress--loading',
      progressLoaded: 'link-tool__progress--loaded'
    };
  }

  /**
   * Prepare input holder
   * @return {HTMLElement} - url input
   */
  makeInputHolder() {
    const inputHolder = this.make('div', this.CSS.inputHolder);

    this.nodes.progress = this.make('label', this.CSS.progress);
    this.nodes.input = this.make('div', [this.CSS.input, this.CSS.inputEl], {
      contentEditable: true
    });

    this.nodes.input.dataset.placeholder = 'Paste Link...';

    this.nodes.input.addEventListener('paste', (event) => {
      const url = (event.clipboardData || window.clipboardData).getData('text');

      this.fetchLinkData(url);
    });

    this.nodes.input.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        event.preventDefault();
        const url = this.nodes.input.textContent;

        this.fetchLinkData(url);
      }
    });

    inputHolder.appendChild(this.nodes.progress);
    inputHolder.appendChild(this.nodes.input);

    return inputHolder;
  }

  /**
   * Prepare link preview holder
   * @return {HTMLElement}
   */
  prepareLinkPreview() {
    const holder = this.make('div', this.CSS.linkContent);

    this.nodes.linkImage = this.make('div', this.CSS.linkImage);
    this.nodes.linkTitle = this.make('h2', this.CSS.linkTitle);
    this.nodes.linkDescription = this.make('p', this.CSS.linkDescription);
    this.nodes.linkText = this.make('a', this.CSS.linkText);

    holder.appendChild(this.nodes.linkImage);
    holder.appendChild(this.nodes.linkTitle);
    holder.appendChild(this.nodes.linkDescription);
    holder.appendChild(this.nodes.linkText);

    return holder;
  }

  /**
   * Compose link preview from fetched data
   * @param meta - link meta data
   */
  showLinkPreview(meta) {
    this.nodes.container.appendChild(this.nodes.linkContent);

    if (meta.image) {
      this.nodes.linkImage.style.backgroundImage = 'url(' + meta.image.url + ')';
    }

    if (meta.title) {
      this.nodes.linkTitle.textContent = meta.title;
    }

    if (meta.description) {
      this.nodes.linkDescription.textContent = meta.description;
    }

    this.nodes.linkText.textContent = this.data.link;
    this.nodes.linkText.setAttribute('href', this.data.link);
    this.nodes.linkContent.classList.add(this.CSS.linkContentRendered);
  }

  /**
   * Show loading progressbar
   */
  showProgress() {
    this.nodes.progress.classList.add(this.CSS.progressLoading);
  }

  /**
   * Hide loading progressbar
   */
  hideProgress() {
    this.nodes.progress.classList.remove(this.CSS.progressLoading);
    this.nodes.progress.classList.add(this.CSS.progressLoaded);
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
   * @param {string} url - link source url
   */
  async fetchLinkData(url) {
    this.showProgress();
    this.data.link = url;

    try {
      const response = await (ajax.get({
        url: this.config.endpoint,
        data: {
          url: url
        }
      }));

      this.onFetch(response);
    } catch (error) {
      console.log('error', error);
      this.api.notifier.show({
        message: 'Didn\'t receive data from server',
        style: 'error'
      });
    }
  }

  /**
   * Link data fetching callback
   * @param {UploadResponseFormat} response
   */
  onFetch(response) {
    if (response && response.success) {
      const metaData = response.meta;

      this.data.linkData = metaData;

      this.nodes.inputHolder.remove();
      this.showLinkPreview(metaData);
    } else {
      this.fetchingFailed('incorrect response: ' + JSON.stringify(response));
    }
  }

  /**
   * Handle link fetching errors
   * @private
   *
   * @param {string} errorText
   */
  fetchingFailed(errorText) {
    console.log('Link Tool: data fetching because of', errorText);

    this.api.notifier.show({
      message: 'Can not get this link data, try another',
      style: 'error'
    });

    this.applyErrorStyle();
  }

  /**
   * Helper method for elements creation
   * @param tagName
   * @param classNames
   * @param attributes
   * @return {HTMLElement}
   */
  make(tagName, classNames = null, attributes = {}) {
    let el = document.createElement(tagName);

    if (Array.isArray(classNames)) {
      el.classList.add(...classNames);
    } else if (classNames) {
      el.classList.add(classNames);
    }

    for (let attrName in attributes) {
      el[attrName] = attributes[attrName];
    }

    return el;
  }
}
