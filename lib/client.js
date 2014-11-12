var autobahn = require('autobahn');

var Client = function (config) {
  this.config = config;
  this.actors = [];

  if (this.config.debug) console.log('init client instance');
  if (this.config.trace) console.dir(this.config);
};

Client.prototype.connect = function () {
  this.connection = new autobahn.Connection({
    url: "ws://" + this.config.host + ":" + this.config.port + "/",
    realm: this.config.realm
  });

  console.log('connection init');
  if (this.config.trace) console.dir(this.connection);
};

Client.prototype.open = function (callback) {
  var self = this;

  this.connection.onopen = function (session, details) {
    session.prefix('api', self.config.uri_prefix);

    console.log('connection openend');
    if (self.config.trace) console.dir([session, details]);

    self.actors.forEach(function register(actor) {

      session.register('api:' + actor.id, actor.fct);
      // announce details

      if (self.config.debug) console.log('actor registered: ' + actor.id);
    });

    callback(session, details);
  };

  this.connection.onclose = function (reason, details) {
    console.log("connection closed");
    if (this.config.trace) console.dir([reason, details]);
  };

  this.connection.open();
};

Client.prototype.close = function () {
  this.connection.close();
};

Client.prototype.addActor = function (actor) {
  this.actors.push(actor);

  console.log('actor added: ' + actor.id);
  if (this.config.trace) console.dir(actor);
};

module.exports.Client = Client;
