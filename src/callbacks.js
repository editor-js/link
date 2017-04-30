/**
 * Codex Editor Link plugin
 *
 * @author Codex-Team
 * @version 1.0.0
 *
 * @type {{URLPasted}}
 */
module.exports = ( function () {

    var intervalID = null;
    var label = null;

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

        clipboardData = event.clipboardData || window.clipboardData;
        pastedURL = clipboardData.getData('Text');

        /** if previous request wasn't successful */
        input.classList.remove('link-holder__label--error');

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
            percentage = 15,
            counter = 1;

        label = ui.drawProgressLabel();
        label.style.width = percentage * counter + '%';

        intervalID = window.setInterval( function () {

            counter ++;
            label.style.width = percentage * counter + '%';

        }, 400);

        input.parentNode.insertBefore(label, input);

    }

    /**
     * Success callback
     * @private
     * @param result
     *
     * @description uses Editor's core API
     */
    function success(result) {

        window.clearInterval(intervalID);

        let currentBlock = codex.editor.content.currentNode,
            parsedJSON,
            embed;

        try {

            parsedJSON = JSON.parse(result);
            parsedJSON.style = core.config.defaultStyle;
            embed = render(parsedJSON);

            /**
             * Editor's content module API
             */
            codex.editor.content.switchBlock(currentBlock, embed);

        } catch (e) {

            label.remove();
            error.call(this);


        }

    }

    /**
     * Error handler
     * @private
     * @param result
     */
    function error(result) {

        let input = this;

        input.classList.add('link-holder__label--error');

    }

    return {
        URLPasted
    };

})();

var ui = require('./ui');
var core = require('./core');
var render = require('./render');