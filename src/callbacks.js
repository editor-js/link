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

        clipboardData = event.clipboardData || window.clipboardData;
        pastedURL = clipboardData.getData('Text');

        /** if previous request wasn't successful */
        input.classList.remove(ui.css.labelError);

        /**
         * Use editors API
         */
        codex.editor.core.ajax({
            url : core.config.fetchURL + '?url=' + pastedURL,
            type : 'GET',
            beforeSend : beforeSend.bind(input),
            success : success,
            error : error.bind(input.parentNode)
        });

    }

    /**
     * BeforeSend callbacks.
     * @private
     */
    function beforeSend() {

        let input = this,
            label = ui.drawLabel();

        input.parentNode.insertBefore(label, input);

        window.setTimeout( function () {

            label.classList.add(ui.css.labelLoading);

        }, 50);

        return input.parentNode;

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
            parsedJSON,
            label = this.querySelector('.' + ui.css.labelLoading),
            embed;

        label.classList.add(ui.css.labelFinish);

        try {

            parsedJSON = JSON.parse(result);
            parsedJSON.style = core.config.defaultStyle;

            if (parsedJSON.success || parsedJSON.success === 1) {

                embed = render(parsedJSON);

                window.setTimeout( function () {

                    /**
                     * Editor's content module API
                     */
                    codex.editor.content.switchBlock(currentBlock, embed);

                }, 2500);


            } else {

                error.call(this);

            }


        } catch (e) {

            error.call(this);

        }

    }

    /**
     * Error handler
     * @private
     * @param result
     */
    function error(result) {

        let linkHolder = this,
            label = linkHolder.querySelector('.' + ui.css.label),
            input = linkHolder.querySelector('.' + ui.css.inputElement);

        label.remove();
        input.classList.add(ui.css.labelError);

    }

    return {
        URLPasted
    };

})();

var ui = require('./ui');
var core = require('./core');
var render = require('./render');