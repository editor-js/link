/**
 * Codex Editor Link plugin
 *
 * @author Codex-Team
 * @version 1.0.0
 *
 * Makes HTML from JSON
 */
module.exports = ( function () {

    function make_(data) {

        let holder;

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

            let inputElement;

            holder = ui.drawLinkHolder();
            inputElement = ui.drawInput();

            inputElement.addEventListener('paste', callbacks.URLPasted.bind(inputElement));

            holder.appendChild(inputElement);

        }

        return holder;

    }

    function render(data) {

        return make_ (data);

    }

    return render;

})();

var ui = require('./ui');
var callbacks = require('./callbacks');