var express = require('express');
var router = express.Router();
var perfilRest = require('perfilrest');

var show = 'false';
var message = "";

var showData = function(res, message, show, data){
      var perfils = "";
      if ((data instanceof Array) && (data.length != 0)) {
             perfils = data;
      }
      res.render('perfil',{perfils: perfils, message: message, show: show});
};

/* GET home page. */
router.get('/', function(req, res) {
   message = "";
   show = 'false';
   perfilRest.getPerfils(function(data){
       showData(res, message, show, data);
   });
});

router.post('/', function(req, res) {
   message = "";
   show = 'false';
   perfilRest.getPerfils(function(data){
       showData(res, message, show, data);
   });
});

router.post('/new', function(req, res){
   var descricao = req.body.descricao;
   message = "";
   show = 'false';
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
   message = "";
   show = 'false';
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
   message = "";
   show = 'false';
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
