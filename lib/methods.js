var request = require('request'),
    CONST = require('./const.js'),
    q = require('q'),
    _ = require('lodash'),
    open = require('open'),
    qstr = require('querystring')

;

function setValues(conf) {
    conf = _.omit(conf, 'output');
    _.extend(this.DEFAULTS, conf);
    return this;
}
function status(conf) {
    return doRequest.call(this, conf, CONST.API.STATUS);
}
function flush(conf) {
    return doRequest.call(this, conf, CONST.API.FLUSH);
}
function padList(conf) {
    return doRequest.call(this, conf, CONST.API.PADLIST);
}
function doRequest(conf, api) {
    var d = q.defer(),
        _this = this,
        url = this.utils.getAPIurl.call(this, api),
        data = this.utils.getData.call(this, CONST.FIELDS[api]),
        done
    ;
    switch (api) {
        case CONST.API.STATUS:
            data.pid = conf || _this.lastPID;
            _this.DEFAULTS.openStatusPage && open(url + '?' + qstr.stringify(data));
            done = function (body) {
                d.resolve(body);
            }
            break;
        case CONST.API.FLUSH:
            _.extend(data, conf);
            done = function (body) {
                _this.lastPID = body.pid;
                d.resolve(body);
            }
            break;
        case CONST.API.PADLIST:
            done = function (body) {
                d.resolve(body.pads);
            }
            break;
    }
    
    _this.utils.errCheck(data, api, d);

    request.post({
        url: url, 
        form: data,
        useQuerystring : true
    },
    function (error, response, body) {
        o= {request: { api: api, href: response.request.href, body: response.request.body }}
        if (error) {
            d.reject(error);
        } else {
            if (response.statusCode !== 200) {
                d.reject(_.extend(response.body?_.pick(response,'body'):response, o));
            } else {
                body = JSON.parse(body);
                if (body.resultCode !== 200) {
                    d.reject(_.extend(body, o));
                } else {
                    done(body);
                }
            }
            
        }
    });
    return d.promise;
}

module.exports = {
    setValues: setValues,
    flush: flush,
    status: status,
    padList:padList
}