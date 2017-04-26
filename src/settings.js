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

        }

        return holder;

    }

    return makeSettings;

})();

var ui = require('./ui');