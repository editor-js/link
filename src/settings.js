/**
 * Codex Editor Link plugin
 *
 * @author Codex Team
 *
 * @description Provides settings interface
 *
 * @return {Function}
 */
module.exports = ( function () {

    /**
     * Main function that draws settings interface
     * @protected
     * @returns {*}
     */
    function makeSettings() {

        let holder = ui.drawSettingsHolder(),
            types = {
                smallCover : 'Маленькая обложка',
                bigCover : 'Большая обложка'
            };

        for (let type in types) {

            let settingsItem = ui.drawSettingsItem(types, type);

            holder.appendChild(settingsItem);

            settingsItem.dataset.style = type;
            settingsItem.addEventListener('click', handleSettingItems);

        }

        return holder;

    }

    /**
     * @private
     * @description uses Editors Core API
     */
    function handleSettingItems() {

        let currentBlock = codex.editor.content.currentNode;

        switch (this.dataset.style) {
            case 'smallCover':
                switchToSmallCover(currentBlock);
                break;
            case 'bigCover':
                switchToBigCover(currentBlock);
                break;
        }

        /**
         * Use Codex Editor API to close settings
         */
        codex.editor.toolbar.settings.close();
    }

    /**
     * Switches to small covered embed
     * @private
     * @param currentBlock
     *
     * @description uses Editors Core API
     */
    function switchToSmallCover (currentBlock) {

        let data = ui.getDataFromHTML(),
            newEmbed;

        data.style = 'smallCover';
        newEmbed = render(data);

        /**
         * Editor's content module API
         */
        codex.editor.content.switchBlock(currentBlock, newEmbed);

    }

    /**
     * Switches to big covered embed
     * @private
     * @param currentBlock
     */
    function switchToBigCover (currentBlock) {

        let data = ui.getDataFromHTML(),
            newEmbed;

        data.style = 'bigCover';
        newEmbed = render(data);

        /**
         * Editor's content module API
         */
        codex.editor.content.switchBlock(currentBlock, newEmbed);

    }

    return makeSettings;

})();

var ui = require('./ui');
var render = require('./render');