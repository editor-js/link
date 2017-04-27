module.exports = ( function () {

    function makeSettings () {

        var holder = ui.drawSettingsHolder(),
            types = {
                miniature : 'Без обложки',
                cover : 'С обложкой'
            };

        for (var type in types) {

            var settingsItem = ui.drawSettingsItem(types, type);
            holder.appendChild(settingsItem);

            settingsItem.dataset.style = type;
            settingsItem.addEventListener('click', handleSettingItems);
        }

        return holder;

    }

    function handleSettingItems () {

        switch (this.dataset.style) {
            case 'miniature':
                break;
            case 'cover':
                console.log('coer');
                break;
        }

    }

    return makeSettings;

})();

var ui = require('./ui');
var render = require('./render');