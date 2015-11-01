var _ = require('lodash');

function cdn(conf) {
    var cdn = {
        DEFAULTS: JSON.parse(JSON.stringify(require('./lib/const.js').DEFAULTS))
    };
    _.extend(cdn, { utils: require('./lib/utils.js') }, require('./lib/methods.js'));
    if (conf) {cdn.setValues(conf)}
    return cdn;
}

module.exports = cdn;