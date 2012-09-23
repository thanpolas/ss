
var authom = require('authom');

var conf = require('../conf/conf');

var usersById = {};
var usersByFbId = {};
var nextUserId = 1;


authom.verifyAuth = true;

authom.createServer({
  service: "facebook",
  id: conf.fb.appId,
  secret: conf.fb.appSecret,
  scope: [""]
});

authom.on("auth", function(req, res, data){
  console.log('AUTH for service:' + data.service);
  console.log('data:');
  console.log(data);

  res.json(data);
});


authom.on("error", function(req, res, err){
  console.log('LOCALAPP caught error.');
  console.log(err);
  res.json(err);
});


/*


everyauth.everymodule.findUserById( function (userId, callback) {

  // callback has the signature, function (err, user) {...}
  //
  var user = usersByFbId[userId] || {};
  callback(null, user);
});

function addUser (source, sourceUser) {
  var user;
  if (arguments.length === 1) { // password-based
    user = sourceUser = source;
    user.id = ++nextUserId;
    return usersById[nextUserId] = user;
  } else { // non-password-based
    user = usersById[++nextUserId] = {id: nextUserId};
    user[source] = sourceUser;
  }
  return user;
}

everyauth.debug = true;

everyauth.facebook
  .appId(conf.fb.appId)
  .appSecret(conf.fb.appSecret)
  .findOrCreateUser( function (session, accessToken, accessTokExtra, fbUserMetadata) {
      return usersByFbId[fbUserMetadata.id] || (usersByFbId[fbUserMetadata.id] = addUser('facebook', fbUserMetadata));
  })
  .redirectPath('/');*/