var config = require('./config');
var clientlib = require('./lib/client');
var client = new clientlib.Client(config);

var adder = {
  id: 'add',
  name: 'Adder',
  description: 'Returns the sum of two integers',
  args: ['int', 'int'],
  returns: ['int'],
  fct: function add(args) {
    return [args[0] + args[1]];
  }
}

client.connect();

client.addActor(adder);

client.open(function (session, details) {
  console.log('doing my own thing');

  session.call('api:add', [5, 4]).then(function showResult(res) {
    console.log("RPC result: Sum: " + res);
  }, session.log);

//  client.close();
});
