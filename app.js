var _ = require('lodash/object');

function cdn(conf) {
    var cdn = {
        DEFAULTS: JSON.parse(JSON.stringify(require('./lib/const.js').DEFAULTS))
    };
    _.extend(cdn, require('./lib/methods.js'));
    if (conf) {cdn.setValues(conf)}
    return cdn;
}

module.exports = cdn;