var express = require('express');
var router = express.Router();
var netConfig = require('netconfig');
var restler = require('restler');

router.get('/', function(req,res){
   res.render('login');
});

router.post('/', function(req,res,next){
   var username = encodeURIComponent(req.body.username);
   var password = encodeURIComponent(req.body.password);
   restler.post("http://"+netConfig.getHost()+":"+netConfig.getPort()+"/notas/usuario/login",{
      data: {username: username, password: password}
   })
   .on('complete', function(response,data){
         var localdata = JSON.parse(data.rawEncoded);
         if (localdata.token !== undefined) {
               global.__token = localdata.token;
               res.redirect('/');
         } else
         if (localdata.message !== undefined) {
               global.__token = "";
               res.redirect('/login');
         } else {
               global.__token = "";
               res.redirect('/login');
         }
   })
   .on('error', function(response, error){
         global.__token = "";
         res.redirect('/login');
   });
   return;
});

module.exports = router;