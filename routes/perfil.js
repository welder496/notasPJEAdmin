var express = require('express');
var router = express.Router();
var perfilRest = require('perfilrest');
var token = global.__token;

var show = 'false';
var message = "";

var showData = function(res, message, show, data, token){
      var perfils = "";
      if ((data instanceof Array) && (data.length != 0)) {
             perfils = data;
      }
      res.render('perfil',{perfils: perfils, message: message, show: show, token: token});
};

/* GET home page. */
router.get('/', function(req, res) {
   token = global.__token;
   message = "";
   show = 'false';
   perfilRest.getPerfils(token, function(data){
       showData(res, message, show, data, token);
   });
});

router.post('/', function(req, res) {
   token = req.body.token;
   message = "";
   show = 'false';
   perfilRest.getPerfils(token, function(data){
       showData(res, message, show, data, token);
   });
   global.__token = token;
});

router.post('/new', function(req, res){
   token = req.body.token;
   var descricao = req.body.descricao;
   message = "";
   show = 'false';
   perfilRest.newPerfil(token,{descricao: descricao},function(data){
             if (data.hasOwnProperty('message')) {
                   message = data.message;
                   show = 'true';
             }
             perfilRest.getPerfils(token, function(data){
                   showData(res, message, show, data, token);
             });
   });
   global.__token = token;
 });

router.delete('/:descricao', function(req, res){
   token = req.body.token;
   var descricao = req.params.descricao;
   message = "";
   show = 'false';
   perfilRest.deletePerfilByDescricao(token, descricao, function(data){
           if (data.hasOwnProperty('message')) {
                 message = data.message;
                 show='true';
           }
           perfilRest.getPerfils(token, function(data){
                 showData(res, message, show, data, token);
           });
   });
   global.__token = token;
});

router.put('/:id/:descricao', function(req, res){
   token = req.body.token;
   var id = req.params.id;
   var descricao = req.params.descricao;
   message = "";
   show = 'false';
   perfilRest.updatePerfilById(token, id, descricao, function(data){
            if (data.hasOwnProperty('message')) {
                 message = data.message;
                 show = 'true';
            }
            perfilRest.getPerfils(token, function(data){
                 showData(res, message, show, data, token);
            });
   });
   global.__token = token;
});

module.exports = router;
