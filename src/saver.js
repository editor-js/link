module.exports = ( function () {

    function prepareDataForSave(data) {

        let clearAll = {
                tags : {}
            },
            allowedTagsForTitle = {
                tags : {
                    p : {}
                }
            },
            allowedTagsForDescription = {
                tags : {
                    p : {},
                    a : {
                        href: true,
                        target: '_blank',
                        rel: 'nofollow'
                    },
                    b : {},
                    i : {}
                }
            };


        if (data.style !== 'bigCover' || data.style !== 'smallCover') {

            // set default style
            data.style = 'smallCover';

        }

        data.title = codex.editor.sanitizer.clean(data.title, allowedTagsForTitle);
        data.description = codex.editor.sanitizer.clean(data.description, allowedTagsForDescription);
        data.linkText = codex.editor.sanitizer.clean(data.linkText, clearAll);
        data.linkUrl = codex.editor.sanitizer.clean(data.linkUrl, clearAll);
        data.image = codex.editor.sanitizer.clean(data.image, clearAll);

        return data;

    }

    function saveData(blockContent) {

        let outputData = ui.getDataFromHTML(blockContent);

        return prepareDataForSave(outputData);

    }

    return saveData;

})();

var ui = require('./ui');