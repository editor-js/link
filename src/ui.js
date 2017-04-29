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
        holderWithMiniature : 'link-holder--miniature',
        holderWithCover : 'link-holder--cover',
        inputElement : 'link-holder__input',
        parsedURLImageMiniatured : 'link-holder__image--miniatured',
        parsedURLImageCovered : 'link-holder__image--covered',
        leftColumnMiniature : 'left-column--miniature',
        leftColumnCover : 'left-column--cover',
        parsedDescription : 'left-column__description',
        link : 'left-column__anchor',
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
     * Returns embed interface with small picture
     *
     * @param data {Object} - Server response
     * @returns {Element}
     *
     * @protected
     */
    function drawEmbedWithMiniature(data) {

        let linkHolder = drawLinkHolder(),
            leftColumn = document.createElement('DIV'),
            title = document.createElement('H3'),
            image = document.createElement('IMG'),
            description = document.createElement('DIV'),
            anchor = document.createElement('A');

        linkHolder.classList.add(css.holderWithMiniature);
        linkHolder.dataset.style = 'miniature';

        title.textContent = data.title;

        description.textContent = data.description;
        description.classList.add(css.parsedDescription);

        image.src = data.image;
        image.classList.add(css.parsedURLImageMiniatured);

        anchor.textContent = data.linkText;
        anchor.href = data.linkUrl;
        anchor.classList.add(css.link);

        leftColumn.classList.add(css.leftColumnMiniature);
        leftColumn.appendChild(title);
        leftColumn.appendChild(description);
        leftColumn.appendChild(anchor);

        linkHolder.appendChild(image);
        linkHolder.appendChild(leftColumn);

        return linkHolder;

    }

    /**
     * Returns embed interface with cover
     *
     * @param data
     * @returns {DocumentFragment}
     *
     * @protected
     */
    function drawEmbedWithCover(data) {

        let linkHolder = drawLinkHolder(),
            title = document.createElement('H2'),
            leftColumn = document.createElement('DIV'),
            image = document.createElement('IMG'),
            description = document.createElement('DIV'),
            anchor = document.createElement('A');

        linkHolder.classList.add(css.holderWithCover);
        linkHolder.dataset.style = 'cover';

        title.textContent = data.title;

        description.textContent = data.description;
        description.classList.add(css.parsedDescription);

        image.src = data.image;
        image.classList.add(css.parsedURLImageCovered);

        anchor.textContent = data.linkText;
        anchor.href = data.linkUrl;

        leftColumn.classList.add(css.leftColumnCover);
        leftColumn.appendChild(title);
        leftColumn.appendChild(description);
        leftColumn.appendChild(anchor);

        linkHolder.appendChild(image);
        linkHolder.appendChild(leftColumn);

        return linkHolder;

    }

    function drawSettingsHolder() {

        let holder = document.createElement('DIV');

        holder.classList.add(css.linkSettings);
        return holder;

    }

    function drawSettingsItem(itemTypes, item) {

        let settingsItem = document.createElement('SPAN');

        settingsItem.textContent = itemTypes[item];
        settingsItem.classList.add(css.linkSettingsItem);

        return settingsItem;

    }

    function getDataFromHTML () {

        let content = codex.editor.content.currentNode,
            linkHolder = content.querySelector('.' + css.linkHolder),
            image = content.querySelector('IMG'),
            description = content.querySelector('.' + css.parsedDescription),
            link = content.querySelector('.' + css.link),
            outputData = {};


        outputData.style = linkHolder.dataset.style;
        outputData.image = image.src;
        outputData.description = description.innerHTML;
        outputData.linkText = link.innerHTML;
        outputData.linkUrl = link.href;

        return outputData;
    }

    return {
        drawInput,
        drawLinkHolder,
        drawEmbedWithMiniature,
        drawEmbedWithCover,
        drawSettingsHolder,
        drawSettingsItem,
        getDataFromHTML
    };


})();

var callbacks = require('./callbacks');