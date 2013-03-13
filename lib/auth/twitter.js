/*jshint camelcase:false */
var url = require('url'),

    Ntwitter = require('ntwitter'),

    config = require('config'),
    sys = require('sys'),
    OAuth,
    _ = require('underscore'),
    secrets = {};

try { OAuth = require('oauth').OAuth; }
catch (e) {
  throw new Error('oauth library could not be loaded.');
}



var twitter = module.exports = {};

twitter.getUdoUrl = 'https://api.twitter.com/1.1/followers/list.json';

twitter.parseURI = function(request) {
  var protocol = request.socket.encrypted ? 'https' : 'http',
    host = request.headers.host || request.connection.remoteAddress;

  return url.parse(protocol + '://' + host + request.url, true);
};



//app.get('/sessions/connect', function(req, res){
twitter.onConnect = function(req, res) {
  var uri = twitter.parseURI(req),
      verifier = uri.query.oauth_verifier,
      token = uri.query.oauth_token;

  var oa = new OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    config.twitter.consumer_key,
    config.twitter.consumer_secret,
    '1.1',
    url.format(uri),
    'HMAC-SHA1'
  );


var onToken = function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
    if (error) {
      console.log('Error getting OAuth access token : ' + sys.inspect(error) + '['+oauthAccessToken+']'+ '['+oauthAccessTokenSecret+']'+ '['+sys.inspect(results)+']', 500);

      return;
    }

var twit = new Ntwitter({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token_key: oauthAccessToken,
  access_token_secret: oauthAccessTokenSecret
});
twit
  .verifyCredentials(function (err, data) {
    console.log(data);
  });

  // oa.get(
  //   twitter.getUdoUrl,
  //   oauthAccessToken,
  //   oauthAccessTokenSecret,
  //   function (error, data, response) {
  //     console.log('TW resp:', data, oauthAccessToken);
  //     if (error) {
  //       res.send('Error getting twitter screen name : ' + sys.inspect(error), 500);
  //       return;
  //     }

  // });




    // oauthAccessToken;
    // oauthAccessTokenSecret;
    //
    // Right here is where we would write out some nice user stuff
    // oa.get(twitter.getUdoUrl, oauthAccessToken, oauthAccessTokenSecret, function (error, data, response) {
    //   console.log('TW resp:', arguments);

    //   if (error) {
    //     res.send('Error getting twitter screen name : ' + sys.inspect(error), 500);
    //     return;
    //   }
    //   res.send('You are signed in: ' + data['screen_name']);
    // });
  };

  if (verifier && token) {
    console.log('v&t:', verifier, token);
    oa.getOAuthAccessToken(token, secrets[token], verifier, onToken);
    return;
  }

  oa.getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results) {
    if (error) {
      res.send('Error getting OAuth request token : ' + sys.inspect(error), 500);
      console.log('err:', arguments);
      return;
    }
    secrets[oauthToken] = oauthTokenSecret;
    res.redirect('https://twitter.com/oauth/authorize?oauth_token=' + oauthToken);
  });
};

//app.get('/sessions/callback', function(req, res){



