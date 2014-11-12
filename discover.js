var config = require('./config');
var Client = require('./lib/client');

var client = new Client(config);

client.connect();

client.open(function (session, details) {
  session.subscribe('api:actors', console.log);

  session.publish('api:actors-request', ["foo"]);
});
