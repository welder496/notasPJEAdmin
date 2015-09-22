var express = require('express');
var router = express.Router();
var perfilRest = require('perfilrest');

var showData = function(res, message, show, data){
      var perfis = "";
      if ((data instanceof Array) && (data.length != 0)) {
             perfils = data;
      }
      res.render('perfil',{perfils: perfils, message: message, show: show});
};

/* GET home page. */
router.get('/', function(req, res) {
   var show = 'false';
   var message = "";
   perfilRest.getPerfils(function(data){
        showData(res, message, show, data);
   });
});

router.post('/', function(req, res) {
   var message = "";
   var show = 'false';
   perfilRest.getPerfils(function(data){
        showData(res, message, show, data);
   });
});

router.post('/new', function(req, res){
   var descricao = req.body.descricao;
   var message="";
   var show = 'false';
   perfilRest.newPerfil({descricao: descricao},function(data){
         if (data.hasOwnProperty('message')) {
                   message = data.message;
                   show = 'true';
         }
         perfilRest.getPerfils(function(data){
              showData(res, message, show, data);
         });
   });
 });

router.delete('/:descricao', function(req, res){
   var descricao = req.params.descricao;
   var message="";
   var perfils="";
   var show = 'false';
   perfilRest.deletePerfilByDescricao(descricao,function(data){
          if (data.hasOwnProperty('message')) {
                   message = data.message;
                   show='true';
          }
          perfilRest.getPerfils(function(data){
                 showData(res, message, show, data);
          });
   });
});

router.put('/:id/:descricao', function(req, res){
   var id = req.params.id;
   var descricao = req.params.descricao;
   var message="";
   var perfils = "";
   var show = 'false';
   perfilRest.updatePerfilById(id, descricao, function(data){
          if (data.hasOwnProperty('message')) {
                   message = data.message;
                   show = 'true';
         }
         perfilRest.getPerfils(function(data){
              showData(res, message, show, data);
         });
   });
});

module.exports = router;
