var CONST = require('./const.js'),
    _ = require('lodash')
;

module.exports = {
    getAPIurl: function (api) { 
        return CONST.SERVICEAREA[this.DEFAULTS.servicearea] + api;
    },
    getData: function (arr) { 
        return _.pick(this.DEFAULTS, arr);
    }




}