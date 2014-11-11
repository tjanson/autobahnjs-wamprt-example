var autobahn = require('autobahn');

function connect(config) {
  var connection = new autobahn.Connection({
    url: "ws://" + config.host + ":" + config.port + "/",
    realm: config.realm
  });

  return connection;
}

module.exports.connect = connect;
