module.exports = ( function () {

    function make_(data) {

        let holder;

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