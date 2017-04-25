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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = ( function () {

    var ui_ = __webpack_require__(4);

    function make_ (data) {

        var holder = ui_.drawLinkHolder();

        return holder;

    }


    function render (data) {
        return make_ (data);
    }

    return render;

})();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/**
 * Created by khaydarovm on 25.04.17.
 */


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/**
 * Created by khaydarovm on 25.04.17.
 */


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {


module.exports = (function (){

    var render = __webpack_require__(0);

    var saver = __webpack_require__(1);

    var settings = __webpack_require__(2);

    return {
        render : render,
        saver : saver,
        makeSettings : settings
    }

})();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = ( function () {

    var css = {

        linkHolder : 'link-holder',
        inputElement : 'link-holder__input',
        parsedURLImage : 'link-holder__image',
        leftColumn : 'left-column',
        parsedDescription : 'left-column__desciption',
        link : 'left-column__anchor'

    };

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

        title.textContent = data.title;

        description.textContent = data.description;
        description.classList.add(css.parsedDescription);

        image.src = data.image;
        image.classList.add(css.parsedURLImage);

        link.textContent = data.linkText;
        link.href = data.linkUrl;
        link.classList.add(css.link);

        leftColumn.classList.add(css.leftColumn);
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
            image = document.createElement('IMG'),
            description = document.createElement('DIV'),
            link = document.createElement('A');

        title.textContent = data.title;

        description.textContent = data.description;

        image.src = data.image;
        image.classList.add(css.parsedURLImage);

        link.textContent = data.linkText;
        link.href = data.linkUrl;

        holder.appendChild(image);
        holder.appendChild(title);
        holder.appendChild(description);
        holder.appendChild(link);

        return holder;

    }

    return {
        drawInput,
        drawLinkHolder,
        drawEmbedWithStyleOne
    }


})();

var callbacks = __webpack_require__(5);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = ( function () {

    function URLPasted (event) {

        var input = this,
            clipboardData,
            pastedURL;

        event.preventDefault();

        clipboardData = event.clipboardData || window.clipboardData;
        pastedURL = clipboardData.getData('Text');

        console.log(pastedURL);

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

var ui = __webpack_require__(4);

/***/ })
/******/ ]);