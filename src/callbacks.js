module.exports = ( function () {

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

    function beforeSend() {

        let input = this,
            intervalID;

        input.value = 'Обрабатывается';
        input.disabled = true;

        intervalID = setInterval( function () {

            input.value += '.';

        }, 400);

        setTimeout( function () {

            clearInterval(intervalID);

        }, 1200);

    }

    function success(result) {

        let currentBlock = codex.editor.content.currentNode,
            parsedJSON = JSON.parse(result),
            embed = ui.drawEmbedWithMiniature(parsedJSON);

        codex.editor.content.switchBlock(currentBlock, embed);

    }

    function error(result) {

    }

    return {
        URLPasted
    };

})();

var ui = require('./ui');
var core = require('./core');