
/*
 * GET home page.
 */

var everyauth = require('everyauth');

exports.index = function(req, res){
  res.render('index', {
    title: 'Home',
    id: 'home',
    brand: 'Superstartup',
    everyauth: everyauth,
    fb: 'asd',// JSON.stringify(everyauth.facebook)
    req: req

  });

};