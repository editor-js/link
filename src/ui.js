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

        linkHolder : 'link-holder',
        holderWithSmallCover : 'link-holder--small-cover',
        holderWithBigCover : 'link-holder--big-cover',
        contentWrapper : 'link-holder-wrapper',
        embedTitle : 'link-holder__title',
        cover : 'link-holder__cover',
        smallCover : 'link-holder__cover--small',
        bigCover : 'link-holder__cover--big',
        description : 'link-holder__description',
        anchor : 'link-holder__anchor',

        inputElement : 'link-holder__input',

        linkSettings : 'link-settings',
        linkSettingsItem : 'link-settings__item'

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
        inputElement.placeholder = 'Вставьте ссылку';

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

    /**
     * Returns embed interface with small cover
     *
     * @param data {Object} - Server response
     * @returns {Element}
     *
     * @protected
     */
    function drawEmbedWithSmallCover(data) {

        let linkHolder = drawLinkHolder(),
            title = document.createElement('DIV'),
            image = document.createElement('IMG'),
            description = document.createElement('DIV'),
            anchor = document.createElement('A');


        linkHolder.classList.add(css.linkHolder, css.holderWithSmallCover);
        linkHolder.dataset.style = 'smallCover';

        image.src = data.image;
        image.classList.add(css.cover, css.smallCover);

        title.textContent = data.title;
        title.classList.add(css.embedTitle);

        description.textContent = data.description;
        description.classList.add(css.description);

        anchor.textContent = data.linkText;
        anchor.href = data.linkUrl;
        anchor.classList.add(css.anchor);

        linkHolder.appendChild(image);
        linkHolder.appendChild(title);
        linkHolder.appendChild(description);
        linkHolder.appendChild(anchor);

        return linkHolder;

    }

    /**
     * Returns embed interface with big cover
     *
     * @param data
     * @returns {DocumentFragment}
     *
     * @protected
     */
    function drawEmbedWithBigCover(data) {

        let linkHolder = drawLinkHolder(),
            image = document.createElement('IMG'),
            title = document.createElement('DIV'),
            wrapper = document.createElement('DIV'),
            description = document.createElement('DIV'),
            anchor = document.createElement('A');

        linkHolder.classList.add(css.linkHolder, css.holderWithBigCover);
        linkHolder.dataset.style = 'bigCover';

        image.src = data.image;
        image.classList.add(css.cover, css.bigCover);

        title.textContent = data.title;
        title.classList.add(css.embedTitle);

        description.textContent = data.description;
        description.classList.add(css.description);

        anchor.textContent = data.linkText;
        anchor.href = data.linkUrl;
        anchor.classList.add(css.anchor);

        wrapper.classList.add(css.contentWrapper);
        wrapper.appendChild(title);
        wrapper.appendChild(description);
        wrapper.appendChild(anchor);

        linkHolder.appendChild(image);
        linkHolder.appendChild(wrapper);

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

    /**
     * Returns data object contains of embed information
     * @protected
     * @returns {{}}
     */
    function getDataFromHTML () {

        let content = codex.editor.content.currentNode,
            linkHolder = content.querySelector('.' + css.linkHolder),
            title = content.querySelector('.' + css.embedTitle),
            image = content.querySelector('.' + css.cover),
            description = content.querySelector('.' + css.description),
            link = content.querySelector('.' + css.anchor),
            outputData = {};

        outputData.style = linkHolder.dataset.style;
        outputData.image = image.src;
        outputData.title = title.textContent;
        outputData.description = description.innerHTML;
        outputData.linkText = link.innerHTML;
        outputData.linkUrl = link.href;

        return outputData;
    }

    return {
        drawInput,
        drawLinkHolder,
        drawEmbedWithSmallCover,
        drawEmbedWithBigCover,
        drawSettingsHolder,
        drawSettingsItem,
        getDataFromHTML
    };


})();