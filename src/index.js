
module.exports = (function (){

    var render = require('./render');

    var saver = require('./saver');

    var settings = require('./settings');

    return {
        render : render,
        saver : saver,
        makeSettings : settings
    }

})();