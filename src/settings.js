/**
 * Codex Editor Link plugin
 *
 * @author Codex Team
 *
 * @description Provides settings interface
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
                miniature : 'Без обложки',
                cover : 'С обложкой'
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
     */
    function handleSettingItems() {

        let currentBlock = codex.editor.content.currentNode;

        switch (this.dataset.style) {
            case 'miniature':
                switchToMiniaturedEmbed(currentBlock);
                break;
            case 'cover':
                switchToCoveredEmbed(currentBlock);
                break;
        }

    }

    function switchToMiniaturedEmbed (currentBlock) {

        let data = ui.getDataFromHTML(),
            newEmbed;

        data.style = 'miniature';
        newEmbed = render(data);
        codex.editor.content.switchBlock(currentBlock, newEmbed);

    }

    function switchToCoveredEmbed (currentBlock) {

        let data = ui.getDataFromHTML(),
            newEmbed;

        data.style = 'cover';
        newEmbed = render(data);
        codex.editor.content.switchBlock(currentBlock, newEmbed);

    }

    return makeSettings;

})();

var ui = require('./ui');
var render = require('./render');