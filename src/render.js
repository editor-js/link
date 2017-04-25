module.exports = ( function () {

    var ui_ = require('./ui');

    function make_ (data) {

        var holder = ui_.drawLinkHolder();

        return holder;

    }


    function render (data) {
        return make_ (data);
    }

    return render;

})();