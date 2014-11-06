var autobahn = require('autobahn');

// tons of debug output
const SUPER_VERBOSE = false;

const HOST = "127.0.0.1"
const PORT = 9000;
const REALM = "testRealm";

var connection = new autobahn.Connection({
  url: "ws://" + HOST + ":" + PORT + "/",
  realm: REALM
});

connection.onopen = function (session, details) {
  console.log("Connection opened.");
  if (SUPER_VERBOSE) console.dir([session, details]);

  var add = function(args) {
    return args[0] + args[1];
  };

  console.log("Attempting to register RPC ...");
  session.register('com.tomjanson.abt.add', add);

  console.log("Calling RPC ... [Add 5 and 4]");
  session.call('com.tomjanson.abt.add', [5, 4]).then(function showResult(res) {
    console.log("RPC result: Sum: " + res);
  }, session.log);

  console.log("Attempting to subscribe to a topic ...");
  session.subscribe('com.tomjanson.abt.fooTopic', function showEvent(msg) {
    console.log("Yay! Event on topic 'fooTopic': ", msg);
  });


  console.log("Attempting to publish a message ...");
  session.publish('com.tomjanson.abt.fooTopic', ["Hello, World!"]);
};

connection.onclose = function (reason, details) {
  console.log("Connection closed.");
  if (SUPER_VERBOSE) console.dir([reason, details]);
}

connection.open();
