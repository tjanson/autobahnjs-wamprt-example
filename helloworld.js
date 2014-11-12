var config = require('./config');
var Client = require('./lib/client');
var Actor  = require('./lib/actor');

var adder = new Actor({
  id: 'add',
  name: 'Adder',
  description: 'Returns the sum of two integers',
  args: ['int', 'int'],
  returns: ['int'],
  fct: function add(args) {
    return [args[0] + args[1]];
  }
});

var client = new Client(config);

client.connect();

client.addActor(adder);

client.open(function (session, details) {
  // test rpc call
  session.call('api:' + adder.id, [5, 4]).then(console.log, session.log);

  // test the actor discovery
  session.subscribe('api:actors', console.log);
  session.publish('api:actors-request', ["foo"]);
});
