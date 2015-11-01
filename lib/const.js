module.exports=
{
    SERVICEAREA: {
        US: 'https://openapi.us.cdnetworks.com/purge/rest/',
        KR: 'https://openapi.kr.cdnetworks.com/purge/rest/',
        JP: 'https://openapi.jp.cdnetworks.com/purge/rest/',
        CN: 'https://openapi.txnetworks.cn/purge/rest/'
    },
    API: {
        PADLIST:'padList',
        FLUSH: 'doPurge',
        STATUS:'status'
    },
    DEFAULTS: {
        user: '',
        pass: '',
        output: 'json',
        type:'item',
        mailTo: [''],
        servicearea: 'US',
        openStatusPage:false

    },
    FIELDS: {
        padList: ['user', 'pass', 'output'],
        doPurge: ['user', 'pass', 'output', 'type', 'mailTo'],
        status: ['user', 'pass', 'output', 'pid']
    }
}
