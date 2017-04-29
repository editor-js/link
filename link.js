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
        holderWithMiniature: 'link-holder--miniature',
        holderWithCover: 'link-holder--cover',
        inputElement: 'link-holder__input',
        parsedURLImageMiniatured: 'link-holder__image--miniatured',
        parsedURLImageCovered: 'link-holder__image--covered',
        leftColumnMiniature: 'left-column--miniature',
        leftColumnCover: 'left-column--cover',
        parsedDescription: 'left-column__description',
        link: 'left-column__anchor',
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
     * Returns embed interface with small picture
     *
     * @param data {Object} - Server response
     * @returns {Element}
     *
     * @protected
     */
    function drawEmbedWithMiniature(data) {

        var linkHolder = drawLinkHolder(),
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

        var linkHolder = drawLinkHolder(),
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

        var holder = document.createElement('DIV');

        holder.classList.add(css.linkSettings);
        return holder;
    }

    function drawSettingsItem(itemTypes, item) {

        var settingsItem = document.createElement('SPAN');

        settingsItem.textContent = itemTypes[item];
        settingsItem.classList.add(css.linkSettingsItem);

        return settingsItem;
    }

    function getDataFromHTML() {

        var content = codex.editor.content.currentNode,
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
        drawInput: drawInput,
        drawLinkHolder: drawLinkHolder,
        drawEmbedWithMiniature: drawEmbedWithMiniature,
        drawEmbedWithCover: drawEmbedWithCover,
        drawSettingsHolder: drawSettingsHolder,
        drawSettingsItem: drawSettingsItem,
        getDataFromHTML: getDataFromHTML
    };
}();

var callbacks = __webpack_require__(4);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {

    function make_(data) {

        var holder = void 0;

        if (data && data.style) {

            switch (data.style) {
                case 'miniature':
                    holder = ui.drawEmbedWithMiniature(data);
                    break;
                case 'cover':
                    holder = ui.drawEmbedWithCover(data);
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

    function saveData(blockContent) {

        console.log(blockContent);
    }

    return saveData;
}();

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
            miniature: 'Без обложки',
            cover: 'С обложкой'
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
     */
    function handleSettingItems() {

        var currentBlock = codex.editor.content.currentNode;

        switch (this.dataset.style) {
            case 'miniature':
                switchToMiniaturedEmbed(currentBlock);
                break;
            case 'cover':
                switchToCoveredEmbed(currentBlock);
                break;
        }
    }

    function switchToMiniaturedEmbed(currentBlock) {

        var data = ui.getDataFromHTML(),
            newEmbed = void 0;

        data.style = 'miniature';
        newEmbed = render(data);
        codex.editor.content.switchBlock(currentBlock, newEmbed);
    }

    function switchToCoveredEmbed(currentBlock) {

        var data = ui.getDataFromHTML(),
            newEmbed = void 0;

        data.style = 'cover';
        newEmbed = render(data);
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


module.exports = function () {

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

    function success(result) {

        var currentBlock = codex.editor.content.currentNode,
            parsedJSON = JSON.parse(result),
            embed = ui.drawEmbedWithMiniature(parsedJSON);

        codex.editor.content.switchBlock(currentBlock, embed);
    }

    function error(result) {}

    return {
        URLPasted: URLPasted
    };
}();

var ui = __webpack_require__(0);
var core = __webpack_require__(7);

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