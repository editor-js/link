module.exports = ( function () {

    function make_ (data) {

        var holder;

        if (data && data.style) {

            holder = ui.drawEmbedWithStyleOne(data);

        } else {

            holder = ui.drawLinkHolder();

        }

        return holder;

    }

    function render (data) {

        return make_ (data);

    }

    return render;

})();

var ui = require('./ui');