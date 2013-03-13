
var authom = require('authom');

var config = require('config');

// var usersById = {};
// var usersByFbId = {};
// var nextUserId = 1;


var auth = module.exports = {};

authom.verifyAuth = true;

authom.createServer({
  service: 'facebook',
  id: config.fb.appId,
  secret: config.fb.appSecret,
  scope: ['']
});
authom.createServer({
  service: 'twitter',
  id: config.twitter.consumerKey,
  secret: config.twitter.consumerSecret
});

authom.on('auth', function(req, res, data){
  console.log('AUTH for service:' + data.service);

// Data object:
// {
//   token: 'xxx-xxx',
//   secret: 'xxx',
//   id: '47002318',
//   data: { user_id: '47002318', screen_name: 'thanpolas' },
//   service: 'twitter'
// }

  switch(data.service) {
    case 'twitter':
      auth.onTwitterAuth(req, res, data);
    break;
  }


});


authom.on('error', function(req, res, err){
  console.log('LOCALAPP caught error.');
  console.log(err);
  res.json(err);
});


auth.onTwitterAuth = function(req, res, data) {
  var out = '<script>';
  out += 'opener.ss.user.tw.oauthToken(\'' + data.token + '\');';
  out += 'close();';
  out += '</script>';

  res.send(out);
};

