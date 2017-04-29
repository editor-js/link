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
module.exports = (function () {

    let render = require('./render');
    let saver  = require('./saver');
    let settings = require('./settings');
    let core = require('./core');

    return {
        prepare : core.prepare,
        render : render,
        save : saver,
        settings : settings
    };

})();