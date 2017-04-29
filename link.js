var cdxEditorLink =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Codex Editor Link plugin
 * @type {Object}
 * @author Codex-Team
 * @version 1.0.0
 *
 * @description Module contains of interface methods
 *
 */

module.exports = function () {

    'use strict';

    /**
     * Css classes
     * @type {Object}
     */

    var css = {

        linkHolder: 'link-holder',
        holderWithSmallCover: 'link-holder--small-cover',
        holderWithBigCover: 'link-holder--big-cover',
        contentWrapper: 'link-holder-wrapper',
        embedTitle: 'link-holder__title',
        cover: 'link-holder__cover',
        smallCover: 'link-holder__cover--small',
        bigCover: 'link-holder__cover--big',
        description: 'link-holder__description',
        anchor: 'link-holder__anchor',

        inputElement: 'link-holder__input',

        linkSettings: 'link-settings',
        linkSettingsItem: 'link-settings__item'

    };

    __webpack_require__(6);

    /**
     * Returns input DOM Element
     * @returns {Element}
     *
     * @protected
     */
    function drawInput() {

        var inputElement = document.createElement('INPUT');

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

        var holder = document.createElement('DIV');

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

        var linkHolder = drawLinkHolder(),
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

        var linkHolder = drawLinkHolder(),
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

        var holder = document.createElement('DIV');

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

        var settingsItem = document.createElement('SPAN');

        settingsItem.textContent = itemTypes[item];
        settingsItem.classList.add(css.linkSettingsItem);

        return settingsItem;
    }

    /**
     * Returns data object contains of embed information
     * @protected
     * @returns {{}}
     */
    function getDataFromHTML() {

        var content = codex.editor.content.currentNode,
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
        drawInput: drawInput,
        drawLinkHolder: drawLinkHolder,
        drawEmbedWithSmallCover: drawEmbedWithSmallCover,
        drawEmbedWithBigCover: drawEmbedWithBigCover,
        drawSettingsHolder: drawSettingsHolder,
        drawSettingsItem: drawSettingsItem,
        getDataFromHTML: getDataFromHTML
    };
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Codex Editor Link plugin
 *
 * @author Codex-Team
 * @version 1.0.0
 *
 * Makes HTML from JSON
 */
module.exports = function () {

    function make_(data) {

        var holder = void 0;

        if (data && data.style) {

            switch (data.style) {
                case 'smallCover':
                    holder = ui.drawEmbedWithSmallCover(data);
                    break;
                case 'bigCover':
                    holder = ui.drawEmbedWithBigCover(data);
                    break;
            }
        } else {

            var inputElement = void 0;

            holder = ui.drawLinkHolder();
            inputElement = ui.drawInput();

            inputElement.addEventListener('paste', callbacks.URLPasted.bind(inputElement));

            holder.appendChild(inputElement);
        }

        return holder;
    }

    function render(data) {

        return make_(data);
    }

    return render;
}();

var ui = __webpack_require__(0);
var callbacks = __webpack_require__(4);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {

    function validate() {}

    function prepareDataForSave(data) {

        var clearAll = {
            tags: {}
        },
            allowedTagsForTitle = {
            tags: {
                p: {}
            }
        },
            allowedTagsForDescription = {
            tags: {
                p: {},
                a: {
                    href: true,
                    target: '_blank',
                    rel: 'nofollow'
                },
                b: {},
                i: {}
            }
        };

        if (data.style !== 'bigCover' || data.style !== 'smallCover') {

            // set default style
            data.style = 'smallCover';
        }

        data.title = codex.editor.sanitizer.clean(data.title, allowedTagsForTitle);
        data.description = codex.editor.sanitizer.clean(data.description, allowedTagsForDescription);
        data.linkText = codex.editor.sanitizer.clean(data.linkText, clearAll);
        data.linkUrl = codex.editor.sanitizer.clean(data.linkUrl, clearAll);
        data.image = codex.editor.sanitizer.clean(data.image, clearAll);

        return data;
    }

    function saveData(blockContent) {

        var outputData = ui.getDataFromHTML();

        return prepareDataForSave(outputData);
    }

    return saveData;
}();

var ui = __webpack_require__(0);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Codex Editor Link plugin
 *
 * @author Codex Team
 *
 * @description Provides settings interface
 *
 * @return {Function}
 */
module.exports = function () {

    /**
     * Main function that draws settings interface
     * @protected
     * @returns {*}
     */
    function makeSettings() {

        var holder = ui.drawSettingsHolder(),
            types = {
            smallCover: 'Маленькая обложка',
            bigCover: 'Большая обложка'
        };

        for (var type in types) {

            var settingsItem = ui.drawSettingsItem(types, type);

            holder.appendChild(settingsItem);

            settingsItem.dataset.style = type;
            settingsItem.addEventListener('click', handleSettingItems);
        }

        return holder;
    }

    /**
     * @private
     * @description uses Editors Core API
     */
    function handleSettingItems() {

        var currentBlock = codex.editor.content.currentNode;

        switch (this.dataset.style) {
            case 'smallCover':
                switchToSmallCover(currentBlock);
                break;
            case 'bigCover':
                switchToBigCover(currentBlock);
                break;
        }

        /**
         * Use Codex Editor API to close settings
         */
        codex.editor.toolbar.settings.close();
    }

    /**
     * Switches to small covered embed
     * @private
     * @param currentBlock
     *
     * @description uses Editors Core API
     */
    function switchToSmallCover(currentBlock) {

        var data = ui.getDataFromHTML(),
            newEmbed = void 0;

        data.style = 'smallCover';
        newEmbed = render(data);

        /**
         * Editor's content module API
         */
        codex.editor.content.switchBlock(currentBlock, newEmbed);
    }

    /**
     * Switches to big covered embed
     * @private
     * @param currentBlock
     */
    function switchToBigCover(currentBlock) {

        var data = ui.getDataFromHTML(),
            newEmbed = void 0;

        data.style = 'bigCover';
        newEmbed = render(data);

        /**
         * Editor's content module API
         */
        codex.editor.content.switchBlock(currentBlock, newEmbed);
    }

    return makeSettings;
}();

var ui = __webpack_require__(0);
var render = __webpack_require__(1);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Codex Editor Link plugin
 *
 * @author Codex-Team
 * @version 1.0.0
 *
 * @type {{URLPasted}}
 */
module.exports = function () {

    /**
     * handles paste event.
     *
     * @param event
     * @protected
     */
    function URLPasted(event) {

        var input = this,
            clipboardData = void 0,
            pastedURL = void 0;

        event.preventDefault();

        clipboardData = event.clipboardData || window.clipboardData;
        pastedURL = clipboardData.getData('Text');

        /**
         * Use editors API
         */
        codex.editor.core.ajax({
            url: core.config.fetchURL + '?url=' + pastedURL,
            type: 'GET',
            beforeSend: beforeSend.bind(input),
            success: success.bind(input),
            error: error.bind(input)
        });
    }

    /**
     * BeforeSend callbacks.
     * @private
     */
    function beforeSend() {

        var input = this,
            intervalID = void 0;

        input.value = 'Обрабатывается';
        input.disabled = true;

        intervalID = setInterval(function () {

            input.value += '.';
        }, 400);

        setTimeout(function () {

            clearInterval(intervalID);
        }, 1200);
    }

    /**
     * Success callback
     * @private
     * @param result
     *
     * @description uses Editor's core API
     */
    function success(result) {

        var currentBlock = codex.editor.content.currentNode,
            parsedJSON = JSON.parse(result),
            embed = void 0;

        parsedJSON.style = core.config.defaultStyle;
        embed = render(parsedJSON);

        /**
         * Editor's content module API
         */
        codex.editor.content.switchBlock(currentBlock, embed);
    }

    /**
     * Error handler
     * @private
     * @param result
     */
    function error(result) {

        // error handler. Add red borders to input

    }

    return {
        URLPasted: URLPasted
    };
}();

var ui = __webpack_require__(0);
var core = __webpack_require__(7);
var render = __webpack_require__(1);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Codex Editor Link plugin
 *
 * @author Codex-Team
 * @version 1.0.0
 *
 * @description Provides render, saver, settings submodules
 *
 * @type {{render, save, settings}}
 */
module.exports = function () {

    var render = __webpack_require__(1);
    var saver = __webpack_require__(2);
    var settings = __webpack_require__(3);
    var core = __webpack_require__(7);

    return {
        prepare: core.prepare,
        render: render,
        save: saver,
        settings: settings
    };
}();

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function (core) {

    core.config = null;

    core.prepare = function (customConfiguration) {

        return new Promise(function (resolve, reject) {

            if ((typeof customConfiguration === 'undefined' ? 'undefined' : _typeof(customConfiguration)) === 'object' && customConfiguration.fetchURL) {

                // set custom configuration
                core.config = customConfiguration;

                resolve();
            } else {

                reject('Cant initialize plugin without fetch server');
            }
        });
    };

    return core;
}({});

/***/ })
/******/ ]);