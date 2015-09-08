var express = require('express');
var router = express.Router();
var notasRest = require('notasrest');


/* GET home page. */
router.get('/', function(req, res, next) {
   notasRest.getPerfils(function(data){
      res.render('perfil',{perfils: data});
   });
});

router.post('/', function(req, res, next){
   notasRest.newPerfil(perfil,function(data){
      var message="";
      if (data.hasOwnProperty('message')) {
            message = data.message;
      }
      notasRest.getPerfils(function(data){
         res.render('perfil',{perfils: data, message: message, show: 'true'});
      });
   });
});

module.exports = router;
