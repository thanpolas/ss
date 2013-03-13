
/*
 * GET home page.
 */

var authom = require('authom');

//var oauthModule = require('../node_modules/everyauth/lib/modules/oauth2');

exports.index = function indexRoute(req, res){
  var err = res.render('index', {
    title: 'Home',
    id: 'home',
    brand: 'Superstartup',
    fb: {}, //JSON.stringify(everyauth.facebook),
    req: req,
    requser: JSON.stringify(req.user)

  });
  console.log(err);
  console.log('############################');
  //console.log(everyauth.facebook);
  console.log(req.user);

};

exports.auth = function authRoute(req, res)
{
  //res.send('hello world');
  //res.send(JSON.stringify(req.user));

  //var cooks = JSON.stringify(req.cookies);
  //var cooknames = JSON.stringify(req.cookies.name);

  var accessToken = 'AAACphcXU4ZCUBAMdG9m71tPe3KjgrNp0DDoQnfZC0VZCPSssOIM0DsYGCZBEcvDifZA5GRAFy5ZBGZAX9XBKJEOe1WFZAV2andYfZBsSqfqBaWAZDZD';

  var fb = authom.servers.facebook;

  //console.log(fb);
  fb.user.query.access_token = accessToken;
  fb.request(fb.user, function(err, user){
      if (err) {
        console.log('ERROR:');
        console.log(err);
        return;
      }

      console.log(user);
  });
};