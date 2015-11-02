# cdnetworks 

A simple Node.js wrapper for the <a href="http://www.cdnetworks.com/" target="_blank" >CDNetworks</a> Cache Flush Open API v2.4.0


---

## Table of contents

- [Installation](#installation)
- [Create an instance](#create-an-instance)
- [Defaults](#defaults)
- [Return types](#return-types)
- [API](#api)
  - [padList](#padlist)
  - [doPurge](#dopurge)
  - [status](#status)
- [Example usage](#example-usage)
- [Service area](#service-area)
- [Additional notes](#additional-notes)

---

## Installation

```npm install cdnetworks```

---

## Create an instance

```var cdn=require('cdnetworks')();```
will create an instance with [default values](#defaults) 

Either override the defaults on instantiation

```var cdn=require('cdnetworks')({user:'myemail@email.com',pass:'secret'})```

or later on, at any time with ```cdn.setValues(conf)```, which returns the cdn instance.
So a method can be chained

```js
cdn.setValues(conf).padList()
```

---

## Defaults

```js
{
    user: null,
    pass: null,
    output: 'json', // xml not supported
    type:'item', // (doPurge): item || wildcard || all
    mailTo: [''], // (status): array of emails to receive flush notifications
    servicearea: 'US',
    openStatusPage:false // (status): open flush status page in browser
}
```

---

## Return types

```setValues``` returns the cdn instance.

The actual [API](#api) methods return a promise.

You would normally follow the method call with a ```then/catch```

```js
cdn.padList()
.then(function(res){
    // cool. do something with res
})
.catch(function(err){
    // bad. handle err
})
```
---

## API

### padList

Lists all the PADs (domains) available to the user

Required arguments: [user, pass]

Optional: [_output_]

##### example

```js
cdn.padList()
.then(function(pads){
    console.log(pads)
})
```
##### response
```js
[
 'image.foocdn.com',
 'adv.foocdn.com'
]

```

### doPurge

Sends cache flush requests.

Required arguments: [user, pass, type, pad],

Optional: [_path_, _output_]

Available types are ['item','wildcard','all']

Default is *item*.

*all* doesn't require *path*, because all items will be flushed.

##### example

This sends *item* flush for 2 files (assuming type has't been overridden)
```js
cdn.doPurge({
    pad: 'image.foocdn.com',
    path: [
        '/imgs/cutepuppy.jpg',
        '/img/littlekitten.jpg'
    ]
})
```
This sends *wildcard* flush for n files in that directory 
```js
cdn.doPurge({
    type: 'wildcard',
    pad: 'image.foocdn.com',
    path: ['/imgs/cutepuppies/*']
})
```
This sends *wildcard* flush, overriding *type* on the cdn instance, which will also apply to following calls
    
```js
cdn.setValues({ type: 'wildcard' }).doPurge({
    pad: 'image.foocdn.com',
    path: ['/imgs/cutepuppies/*']
})
```

```
.then(function(res){
    console.log(res)
})
```
##### response
```js
{
 'resultCode':200,
 'pid': 13459,
 'details': 'success (2 items)',
 'paths':[
    '/images/logo.gif',
    '/images/copyright.gif'
 ],
 'notice': 'Maintenance scheduled at ...'
}
```

On each succesful purge the PID (purge id) is stored on the instance, and used by `cdn.status()` if no PID is provided


### status

Check Flush Completion Status

Required arguments: [user, pass, pid]

Optional: [ _output_, _mailTo_, _openStatusPage_]

##### example

this uses the last stored PID from latest flush
```js
cdn.status()
```
this overddides some defaults and queries a PID that might not be from the latest purge
```js
cdn.setValues({
    emailTo:[
        'mycollegue@thataskedme.purge',
        'my@super.visor'
    ],
    openStatusPage:true
}).status(12345)
```
##### response

```js
{
    "details": "Requested information returned",
    "percentComplete": 100,
    "resultCode": 200
}
```

_That being said, in my tests `status()` will almost invariably return a 400 if called right after a purge. That is because the PID takes about 10-15 seconds to be ready for queries. Optionally one can set `openStatusPage:true` to have the status page open in a browser. One can then refresh the page to check the status._  

---

## Service area

CDNetworks offers different access domains for different areas served.

Available service areas are

```js
{
    US: 'https://openapi.us.cdnetworks.com/purge/rest/',
    KR: 'https://openapi.kr.cdnetworks.com/purge/rest/',
    JP: 'https://openapi.jp.cdnetworks.com/purge/rest/',
    CN: 'https://openapi.txnetworks.cn/purge/rest/'
}
```

The default is US/Global.
I haven't noticed any difference using one or the other, but there you have them.

Again, you can override the default service area either on instantiation or later on with, for instance, `setValues({servicearea:'JP'})`

---

## Example usage

```js
var cdn=require('cdnetworks')({
    user:'my@email.com',
    pass:'secret',
    emailTo:['my@email.com']
});

var pidArr = [];

cdn.doPurge({
    type: 'wildcard',
    pad: 'that.domain.com',
    path: ['/some/path/*']
})
.then(function (res) {
    pidArr.push(res.pid);
    console.log(res);
    return cdn.doPurge({
        pad: 'that.otherdomain.com',
        path: ['/stuff/to/purge.js']
    })
})
.then(function (res) {
    pidArr.push(res.pid);
    console.log(res);
    cdn.setValues({ openStatusPage: true });
    pidArr.forEach(function (idx, pid) {
        cdn.status(pid);
    });
})
.catch(function (err) {
    console.log(err)
})
```

---

## Additional notes

Although the CDNetworks API offers both XML and JSON as output types, only JSON is supported here.
I can't see why anyone would want to have to deal with XML rather than JSON when working with JavaScript. I would certainly avoid it when possible, so I did. 


#### Please see the CDNetworks API documentation for a full list of options and parameters for each API call
