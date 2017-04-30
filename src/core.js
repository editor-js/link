module.exports = ( function (core) {

    core.config = null;

    core.prepare = function (customConfiguration) {

        return new Promise( function (resolve, reject) {

            if (typeof customConfiguration === 'object' && customConfiguration.fetchURL) {

                // set custom configuration
                core.config = customConfiguration;

                resolve();

            } else {

                reject('Cant initialize plugin without fetch server');

            }

        });

    };

    return core;

})({});