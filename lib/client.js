var autobahn = require('autobahn');

var Client = function (config) {
  this.config = config;

  this.actors = [];
  this.actorqueue = [];

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
    self.session = session;
    session.prefix('api', self.config.uri_prefix);

    console.log('connection openend');
    if (self.config.trace) console.dir([session, details]);

    session.subscribe('api:actors-request', self.announceActors.bind(self));

    self.actorqueue.forEach(function (actor) {
      self.registerActor(actor); // why is the closure needed?
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

  if (!this.session) {
    this.actorqueue.push(actor);
    if (this.config.debug) console.log('registration deferred');
  } else {
    this.registerActor(actor);
  }
};

Client.prototype.registerActor = function (actor) {
  this.session.register('api:' + actor.id, actor.fct);
  console.log('actor registered: ' + actor.id);
};

Client.prototype.announceActors = function () {
  if (this.actors.length > 0) {
    var jsonlist = JSON.stringify(this.actors);
    this.session.publish('api:actors', [jsonlist]);
  }
};

module.exports = Client;
