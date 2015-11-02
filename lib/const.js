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
        DOPURGE: 'doPurge',
        STATUS:'status'
    },
    DEFAULTS: {
        user: null,
        pass: null,
        output: 'json', // xml not supported
        type:'item', // (doPurge): item || wildcard || all
        mailTo: [''], // (status): array of emails to receive flush notifications
        servicearea: 'US',
        openStatusPage:false // (status): open flush status page in browser

    },
    FIELDS: {
        padList: ['user', 'pass', 'output'],
        doPurge: ['user', 'pass', 'output', 'type', 'mailTo'],
        status: ['user', 'pass', 'output', 'pid']
    },
    FLUSHTYPE: {
        ITEM: 'item',
        WILD: 'wildcard',
        ALL:'all'
    }
}
