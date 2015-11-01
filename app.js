var _ = require('lodash');

function cdn() {
    var cdn = {
        DEFAULTS: JSON.parse(JSON.stringify(require('./lib/const.js').DEFAULTS))
    };
    _.extend(cdn, { utils: require('./lib/utils.js') }, require('./lib/methods.js'));
    return cdn;
}


module.exports = cdn;