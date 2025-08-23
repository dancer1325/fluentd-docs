// 1. time parameter   -> override default one
var form = new FormData();
form.set('json', JSON.stringify({"foo": "bar"}));

var req = new XMLHttpRequest();
req.open('POST', 'http://localhost:9880/debug.log');
req.send(form);
