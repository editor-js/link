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
        input.classList.remove(ui.css.inputError);

        /**
         * Use editors API
         */
        codex.editor.core.ajax({
            url : core.config.fetchURL + '?url=' + pastedURL,
            type : 'GET',
            beforeSend : beforeSend.bind(input),
            success : success,
            error : error
        });

    }

    /**
     * BeforeSend callbacks.
     * @private
     */
    function beforeSend() {

        let input = this,
            label = ui.drawLabel(),
            pluginHolder = input.parentNode;

        pluginHolder.insertBefore(label, input);

        window.setTimeout( function () {

            label.classList.add(ui.css.labelLoading);

        }, 50);

        return pluginHolder;

    }

    /**
     * Success callback
     * @private
     * @param result
     *
     * @this {Element} pluginHolder
     *
     * @description uses Editor's core API
     */
    function success(result) {

        let pluginHolder = this,
            parsedJSON,
            label = pluginHolder.querySelector('.' + ui.css.label),
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
                    codex.editor.content.switchBlock(pluginHolder, embed, 'link');

                }, 2500);


            } else {

                error.call(pluginHolder, parsedJSON.message);

            }


        } catch (e) {

            error.call(pluginHolder);

        }

    }

    /**
     * Error handler
     * @private
     * @param {String|null} message - error description
     */
    function error(message) {

        let linkHolder = this,
            label = linkHolder.querySelector('.' + ui.css.label),
            input = linkHolder.querySelector('.' + ui.css.inputElement);

        input.classList.add(ui.css.inputError);

        label.remove();

        codex.editor.notifications.notification({type: 'error', message: message || 'Unsupported link'});

    }

    return {
        URLPasted
    };

})();

var ui = require('./ui');
var core = require('./core');
var render = require('./render');