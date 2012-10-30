

goog.provide('ssn.user');


var User = function () {
  this.users = {};
};
goog.addSingletonGetter(User);

User.prototype.findByService = function(service, id)
{

};

module.exports = User.getInstance();