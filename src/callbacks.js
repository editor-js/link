module.exports = ( function () {

    function URLPasted (event) {

        var input = this,
            clipboardData,
            pastedURL;

        event.preventDefault();

        clipboardData = event.clipboardData || window.clipboardData;
        pastedURL = clipboardData.getData('Text');

        /**
         * Use editors API
         */
        codex.editor.core.ajax({
            url : '/fetchURL?url=' + pastedURL,
            type : 'GET',
            beforeSend : beforeSend.bind(input),
            success : success.bind(input),
            error : error.bind(input)
        });

    }

    function beforeSend () {

        var input = this,
            intervalID;

        input.value = "Обрабатывается";
        input.disabled = true;

        intervalID = setInterval( function () {

            input.value += '.';

        }, 400);

        setTimeout( function () {

            clearInterval(intervalID);

        }, 1200);
    }

    function success (result) {

        var parsedJSON = JSON.parse(result),
            input = this,
            embed = ui.drawEmbedWithStyleTwo(parsedJSON);

        input.replaceWith(embed);

    }

    function error (result) {

    }

    return {
        URLPasted
    };

})();

var ui = require('./ui');