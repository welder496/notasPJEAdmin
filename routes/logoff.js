var express = require('express');
var router = express.Router();
var netConfig = require('netconfig');
var restler = require('restler');
var token = global.__token;

router.post('/',function(req, res){
      if (req.body.token !== "undefined") {
            token = req.body.token;
      } else {
            token = global.__token;
      }
      restler.post("http://"+netConfig.getHost()+':'+netConfig.getPort()+'/notas/usuario/logout',{
            accessToken: token
      })
      .on('complete', function(response, data){
            res.redirect('/login');
      })
      .on('error', function(response, error){
            res.redirect('/login');
      });
      global.__token = token;
});

module.exports = router;