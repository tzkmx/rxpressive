/* @flow */
var rxpressive = require('../');
var app = rxpressive();
var bodyParser = require('body-parser');

app.use(bodyParser.json())
  .subscribe(function (rxpressive){
    rxpressive.next();
  });
app.use(bodyParser.urlencoded({ extended: false }))
  .subscribe(function (rxpressive){
    rxpressive.next();
  });

var counter/*: number*/ = 0;

app.get('/').subscribe(function(rxpressive) {
  rxpressive.res.send({counter: counter});
});

app.post('/').subscribe(function(rxpressive) {
  var body/*: any*/ = rxpressive.req.body;
  var send = rxpressive.res.send.bind(rxpressive.res);

  if (body.counter != undefined) {
    counter = Number(body.counter);

    send({result: true});
  }
  else {
    send({result: false});
  }
});

app.listen(3000).subscribe(function() {
  console.log('Server is activated on http://localhost:3000/');
});
