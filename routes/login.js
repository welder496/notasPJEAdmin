var express = require('express');
var router = express.Router();
var netConfig = require('netconfig');
var restler = require('restler');

router.get('/', function(req,res){
   global.__token = "";
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
         }
         if (localdata.message !== undefined) {
               global.__token = "";
               res.redirect('/login');
         }
   })
   .on('error', function(responde, error){
         global.__token = "";
         res.redirect('/login');
   });
   res.redirect('/login');
});

module.exports = router;