/**
 * Codex Editor Link plugin
 * @type {Object}
 * @author Codex-Team
 * @version 1.0.0
 *
 * @description Module contains of interface methods
 *
 */

module.exports = ( function () {

    'use strict';

    /**
     * Css classes
     * @type {Object}
     */
    let css = {

        linkHolder           : 'cdx-link-tool',
        linkRendered         : 'cdx-link-tool--rendered',
        linkWithBigCover     : 'cdx-link-tool--bigCover',
        linkWithSmallCover   : 'cdx-link-tool--smallCover',
        contentWrapper       : 'cdx-link-tool-wrapper',
        embedTitle           : 'cdx-link-tool__title',
        cover                : 'cdx-link-tool__cover',
        smallCover           : 'cdx-link-tool__cover--small',
        bigCover             : 'cdx-link-tool__cover--big',
        description          : 'cdx-link-tool__description',
        anchor               : 'cdx-link-tool__anchor',

        inputElement         : 'cdx-link-tool__input',

        label                : 'cdx-link-tool__label',
        labelLoading         : 'cdx-link-tool__label--loading',
        labelFinish          : 'cdx-link-tool__label--finish',
        labelError           : 'cdx-link-tool__label--error',

        linkSettings         : 'link-settings',
        linkSettingsItem     : 'link-settings__item',
        settingsItemActive   : 'link-settings__item--active'

    };

    require('./css/style.css');

    /**
     * Returns input DOM Element
     * @returns {Element}
     *
     * @protected
     */
    function drawInput() {

        let inputElement = document.createElement('INPUT');

        inputElement.type = 'input';
        inputElement.classList.add(css.inputElement);
        inputElement.placeholder = 'Paste Link...';

        return inputElement;

    }

    /**
     * Returns input holder
     * @returns {Element}
     *
     * @protected
     */
    function drawLinkHolder() {

        let holder = document.createElement('DIV');

        holder.classList.add(css.linkHolder);

        return holder;

    }

    function drawEmbed(data) {

        let linkHolder = drawLinkHolder(),
            title = document.createElement('DIV'),
            imageHolder = document.createElement('DIV'),
            description = document.createElement('DIV'),
            anchor = document.createElement('A');

        linkHolder.dataset.style = data.style;
        linkHolder.classList.add(css.linkHolder, css.linkRendered);

        imageHolder.classList.add(css.cover);
        imageHolder.style.backgroundImage = 'url(\"' + data.image + '\")';

        title.textContent = data.title;
        title.classList.add(css.embedTitle);

        description.textContent = data.description;
        description.classList.add(css.description);

        anchor.textContent = data.linkText;
        anchor.href = data.linkUrl;
        anchor.classList.add(css.anchor);

        linkHolder.appendChild(imageHolder);

        switch (data.style) {

            case 'smallCover':
                linkHolder.classList.add(css.linkWithSmallCover);
                imageHolder.classList.add(css.smallCover);

                linkHolder.appendChild(title);
                linkHolder.appendChild(description);
                linkHolder.appendChild(anchor);
                break;

            case 'bigCover':
                imageHolder.classList.add(css.bigCover);
                linkHolder.classList.add(css.linkWithBigCover);

                let contentWrapper = document.createElement('DIV');

                contentWrapper.classList.add(css.contentWrapper);
                contentWrapper.appendChild(title);
                contentWrapper.appendChild(description);
                contentWrapper.appendChild(anchor);

                linkHolder.appendChild(contentWrapper);
                break;

        }

        return linkHolder;

    }

    /**
     * Draws settings holder
     * @protected
     *
     * @returns {Element}
     */
    function drawSettingsHolder() {

        let holder = document.createElement('DIV');

        holder.classList.add(css.linkSettings);
        return holder;

    }

    /**
     * @protected
     *
     * @param itemTypes
     * @param item
     *
     * @returns {Element}
     */
    function drawSettingsItem(itemTypes, item) {

        let settingsItem = document.createElement('SPAN');

        settingsItem.textContent = itemTypes[item];
        settingsItem.classList.add(css.linkSettingsItem);

        return settingsItem;

    }

    function drawLabel() {

        let label = document.createElement('LABEL');

        label.classList.add(css.label);

        return label;

    }

    /**
     * Returns data object contains of embed information
     * @protected
     * @returns {{}}
     */
    function getDataFromHTML(blockContent) {

        let content = codex.editor.content.currentNode,
            linkHolder = blockContent || content.querySelector('.' + css.linkHolder),
            title = linkHolder.querySelector('.' + css.embedTitle),
            imageHolder = linkHolder.querySelector('.' + css.cover),
            imageURL = imageHolder.style.backgroundImage.match(/http?.[^"]+/),
            description = linkHolder.querySelector('.' + css.description),
            link = linkHolder.querySelector('.' + css.anchor),
            outputData = {};

        outputData.style = linkHolder.dataset.style;
        outputData.image = imageURL;
        outputData.title = title.textContent;
        outputData.description = description.innerHTML;
        outputData.linkText = link.innerHTML;
        outputData.linkUrl = link.href;

        return outputData;

    }

    return {
        css,
        drawInput,
        drawLabel,
        drawLinkHolder,
        drawEmbed,
        drawSettingsHolder,
        drawSettingsItem,
        getDataFromHTML
    };


})();