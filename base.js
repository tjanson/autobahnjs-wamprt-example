var config = require('./config');
var Client = require('./lib/client');

var client = new Client(config);

client.connect();

client.open(function (session, details) {
  // do stuff
});
