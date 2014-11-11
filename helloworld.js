var client = require('./lib/client');
var config = require('./config');

// tons of debug output
const SUPER_VERBOSE = false;

var connection = client.connect(config);

connection.onopen = function (session, details) {
  session.prefix('api', config.uri_prefix);

  console.log("Connection opened.");
  if (SUPER_VERBOSE) console.dir([session, details]);

  var add = function(args) {
    return args[0] + args[1];
  };

  console.log("Attempting to register RPC ...");
  session.register('api:add', add);

  console.log("Calling RPC ... [Add 5 and 4]");
  session.call('api:add', [5, 4]).then(function showResult(res) {
    console.log("RPC result: Sum: " + res);
  }, session.log);

  console.log("Attempting to subscribe to a topic ...");
  session.subscribe('api:fooTopic', function showEvent(msg) {
    console.log("Yay! Event on topic 'fooTopic': ", msg);
  });

  console.log("Attempting to publish a message ...");
  session.publish('', ["Hello, World!"]);
};

connection.onclose = function (reason, details) {
  console.log("Connection closed.");
  if (SUPER_VERBOSE) console.dir([reason, details]);
}

connection.open();
