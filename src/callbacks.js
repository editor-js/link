/**
 * Codex Editor Link plugin
 *
 * @author Codex-Team
 * @version 1.0.0
 *
 * @type {{URLPasted}}
 */
module.exports = ( function () {

    /**
     * handles paste event.
     *
     * @param event
     * @protected
     */
    function URLPasted(event) {

        let input = this,
            clipboardData,
            pastedURL;

        event.preventDefault();

        clipboardData = event.clipboardData || window.clipboardData;
        pastedURL = clipboardData.getData('Text');

        /**
         * Use editors API
         */
        codex.editor.core.ajax({
            url : core.config.fetchURL + '?url=' + pastedURL,
            type : 'GET',
            beforeSend : beforeSend.bind(input),
            success : success.bind(input),
            error : error.bind(input)
        });

    }

    /**
     * BeforeSend callbacks.
     * @private
     */
    function beforeSend() {

        let input = this,
            intervalID;

        input.value = 'Обрабатывается';
        input.disabled = true;

        intervalID = window.setInterval( function () {

            input.value += '.';

        }, 400);

        window.setTimeout( function () {

            window.clearInterval(intervalID);

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

        let currentBlock = codex.editor.content.currentNode,
            parsedJSON = JSON.parse(result),
            embed;

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
        URLPasted
    };

})();

var ui = require('./ui');
var core = require('./core');
var render = require('./render');