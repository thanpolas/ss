
require('nclosure').nclosure();
var conf = require('../conf/conf');


var User = function () {
  this.users = {};
};
goog.addSingletonGetter(User);

User.prototype.findByService = function(service, id)
{

};

module.exports = User.getInstance();