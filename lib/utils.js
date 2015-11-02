var CONST = require('./const.js'),
    _ = require('lodash/object')
;

module.exports = {
    getAPIurl: function (api) { 
        return CONST.SERVICEAREA[this.DEFAULTS.servicearea] + api;
    },
    getData: function (arr) { 
        return _.pick(this.DEFAULTS, arr);
    },
    errCheck: function (data, api, d) {
        var message;
        switch (api) {
            case CONST.API.STATUS:
                if (!data.pid) {
                    message = 'no pid stored from last flush and no pid provided now';
                }
                break;
            case CONST.API.DOPURGE:
                if (!data.type) {
                    message = 'no flush type provided';
                } else if (!data.pad) { 
                    message = 'no pad provided';
                } else if (data.type !== CONST.FLUSHTYPE.ALL && !(data.path instanceof Array)) {
                    message = 'no path array provided';
                }
                break;
        }
        if (!(data.user || data.pass)) { 
            message = 'missing username or password'
        }
        if (message) d.reject({ api: api, message: message });
    }
}