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

module.exports = ( function () {

    var css = {

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

    var linkHolder = null;

    function drawInput () {

        var inputElement = document.createElement('INPUT');
        inputElement.type = 'input';
        inputElement.classList.add(css.inputElement);

        return inputElement;

    }

    function drawLinkHolder () {

        var holder = document.createElement('DIV'),
            inputElement = drawInput();

        holder.classList.add(css.linkHolder);
        holder.appendChild(inputElement);

        linkHolder = holder;

        inputElement.addEventListener('paste', callbacks.URLPasted.bind(inputElement));

        return holder;

    }

    function drawEmbedWithStyleOne (data) {

        var holder = document.createDocumentFragment(),
            leftColumn = document.createElement('DIV'),
            title = document.createElement('H3'),
            image = document.createElement('IMG'),
            description = document.createElement('DIV'),
            link = document.createElement('A');

        linkHolder.classList.add(css.holderWithMiniature);

        title.textContent = data.title;

        description.textContent = data.description;
        description.classList.add(css.parsedDescription);

        image.src = data.image;
        image.classList.add(css.parsedURLImageMiniatured);

        link.textContent = data.linkText;
        link.href = data.linkUrl;
        link.classList.add(css.link);

        leftColumn.classList.add(css.leftColumnMiniature);
        leftColumn.appendChild(title);
        leftColumn.appendChild(description);
        leftColumn.appendChild(link);

        holder.appendChild(image);
        holder.appendChild(leftColumn);

        return holder;
    }

    function drawEmbedWithStyleTwo (data) {

        var holder = document.createDocumentFragment(),
            title = document.createElement('H2'),
            leftColumn = document.createElement('DIV'),
            image = document.createElement('IMG'),
            description = document.createElement('DIV'),
            link = document.createElement('A');

        linkHolder.classList.add(css.holderWithCover);

        title.textContent = data.title;

        description.textContent = data.description;
        description.classList.add(css.parsedDescription);

        image.src = data.image;
        image.classList.add(css.parsedURLImageCovered);

        link.textContent = data.linkText;
        link.href = data.linkUrl;

        leftColumn.classList.add(css.leftColumnCover);
        leftColumn.appendChild(title);
        leftColumn.appendChild(description);
        leftColumn.appendChild(link);

        holder.appendChild(image);
        holder.appendChild(leftColumn);

        return holder;

    }

    function drawSettingsHolder () {

        var holder = document.createElement('DIV');
        holder.classList.add(css.linkSettings);
        return holder;

    }

    function drawSettingsItem (itemTypes, item) {

        var settingsItem = document.createElement('SPAN');
        settingsItem.textContent = itemTypes[item];
        settingsItem.classList.add(css.linkSettingsItem);

        return settingsItem;

    }

    return {
        drawInput,
        drawLinkHolder,
        drawEmbedWithStyleOne,
        drawEmbedWithStyleTwo,
        drawSettingsHolder,
        drawSettingsItem
    }


})();

var callbacks = __webpack_require__(4);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = ( function () {

    function make_ (data) {

        var holder = ui.drawLinkHolder();

        return holder;

    }

    function render (data) {
        return make_ (data);
    }

    return render;

})();

var ui = __webpack_require__(0);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = ( function () {

    function saveData (blockContent) {

        console.log(blockContent);

    }

    return saveData

})();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = ( function () {

    function makeSettings () {

        var holder = ui.drawSettingsHolder(),
            types = {
                miniature : 'Без обложки',
                cover : 'С обложкой'
            };

        for (var type in types) {

            var settingsItem = ui.drawSettingsItem(types, type);
            holder.appendChild(settingsItem);

        }

        return holder;

    }

    return makeSettings;

})();

var ui = __webpack_require__(0);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = ( function () {

    function URLPasted (event) {

        var input = this,
            clipboardData,
            pastedURL;

        event.preventDefault();

        clipboardData = event.clipboardData || window.clipboardData;
        pastedURL = clipboardData.getData('Text');

        /**
         * Use editors API
         */
        codex.editor.core.ajax({
            url : '/fetchURL?url=' + pastedURL,
            type : 'GET',
            beforeSend : beforeSend.bind(input),
            success : success.bind(input),
            error : error.bind(input)
        });

    }

    function beforeSend () {

        console.log('before');

    }

    function success (result) {

        var parsedJSON = JSON.parse(result),
            input = this,
            embed = ui.drawEmbedWithStyleOne(parsedJSON);

        input.replaceWith(embed);

    }

    function error (result) {

    }

    return {
        URLPasted
    };

})();

var ui = __webpack_require__(0);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {


module.exports = (function (){

    var render = __webpack_require__(1);
    var saver = __webpack_require__(2);
    var settings = __webpack_require__(3);

    return {
        render : render,
        save : saver,
        settings : settings
    }

})();

/***/ })
/******/ ]);