var Actor = function (actor) {
  if (typeof actor === 'undefined') actor = {};

  this.id          = actor.id          || 'actor' + Math.floor((1 + Math.random()) * 1000000)
  this.name        = actor.name        || 'Unnamed actor';
  this.type        = actor.type        || 'unspecified';
  this.args        = actor.args        || [];
  this.returns     = actor.returns     || [];
  this.description = actor.description || '';

  var self = this;
  this.fct = function (args) {
    console.log('actor called: ' + self.id);
    return (actor.fct || function noop(){})(args);
  }
}

module.exports = Actor;
