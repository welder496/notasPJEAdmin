var express = require('express');
var router = express.Router();
var funcionalidadesRest = require('funcionalidaderest');

var descricao = "";
var message = "";
var show = 'false';
var token = global.__token;

var showData = function(res, descricao, message, show, data, token){
      var funcionalidades = "";
      var subTipos = "";
      if ((data instanceof Array) && (data.length != 0)) {
           funcionalidades = data;
           if (descricao == "")
                 descricao = funcionalidades[0].descricao;
           funcionalidadesRest.getFuncionalidadeByDescricao(token, descricao,function(data){
                 if ((data.subtipos instanceof Array) && (data.subtipos.length != 0)) {
                       subTipos = data.subtipos;
                 }
                 res.render('funcionalidade',{funcionalidades: funcionalidades, subTipos: subTipos, message: message, show: show, token: token});
           });
      } else {
           res.render('funcionalidade',{funcionalidades: funcionalidades, subTipos: subTipos, message: message, show: show, token: token});
      }
};

/* GET home page. */
router.get('/', function(req, res, next) {
    token = global.__token;
    message = "";
    show = 'false';
    funcionalidadesRest.getFuncionalidades(token, function(data){
          showData(res, descricao, message, show, data, token);
    });
});

router.get('/descricao/:descricao', function(req,res, next){
    token = global.__token;
    var descricao = req.params.descricao;
    message = "";
    show = 'false';
    funcionalidadesRest.getFuncionalidades(token, function(data){
           showData(res, descricao, message, show, data, token);
    });
});

router.post('/descricao/:descricao/subtipo/:subtipo', function(req,res,next){
      token = req.body.token;
      var descricao = req.params.descricao;
      var subtipo = req.params.subtipo;
      message = "";
      show = 'false';
      funcionalidadesRest.getFuncionalidades(token, function(data){
           if ((data instanceof Array) && (data.length != 0)) {
                 funcionalidades = data;
                 funcionalidadesRest.newFuncionalidadeSubTipo(token, descricao,subtipo, function(data){
                       if (data.hasOwnProperty('message')){
                            message = data.message;
                            show = 'true';
                       }
                       showData(res, descricao, message, show, funcionalidades, token);
                 });
           } else {
                 res.render('funcionalidade',{funcionalidades: funcionalidades, subTipos: subTipos, message: message, show: show, token: token});
           }
      });
      global.__token = token;
});

router.delete('/descricao/:descricao/subtipo/:subtipo', function(req, res, next){
      token = req.body.token;
      var descricao = req.params.descricao;
      var subTipo = req.params.subtipo;
      message = "";
      show = 'false';
      funcionalidadesRest.getFuncionalidades(token, function(data){
           if ((data instanceof Array) && (data.length != 0)) {
                 funcionalidades = data;
                 funcionalidadesRest.deleteFuncionalidadeSubTipo(token, descricao,subTipo, function(data){
                      if (data.hasOwnProperty('message')){
                            message = data.message;
                            show = 'true';
                      }
                      showData(res, descricao, message, show, funcionalidades, token);
                 });
           } else {
                 res.render('funcionalidade',{funcionalidades: funcionalidades, subTipos: subTipos, message: message, show: show, token: token});
           }
      });
      global.__token = token;
});

router.put('/descricao/:descricao/subtipo/:subtipo/to/:newsubtipo', function(req, res, next){
      token = req.body.token;
      var descricao = req.params.descricao;
      var subTipo = req.params.subtipo;
      var newsubTipo = req.params.newsubtipo;
      message = "";
      show = 'false';
      funcionalidadesRest.getFuncionalidades(token, function(data){
           if ((data instanceof Array) && (data.length != 0)) {
                 funcionalidades = data;
                 funcionalidadesRest.updateFuncionalidadeSubTipo(token, descricao,subTipo,newsubTipo, function(data){
                      if (data.hasOwnProperty('message')){
                            message = data.message;
                            show = 'true';
                      }
                      showData(res, descricao, message, show, funcionalidades, token);
                 });
           } else {
                 res.render('funcionalidade',{funcionalidades: funcionalidades, subTipos: subTipos, message: message, show: show, token: token});
           }
      });
      global.__token=token;
});

router.post('/descricao/:descricao', function(req, res, next){
     token = req.body.token;
     var descricao = req.params.descricao;
     message = "";
     show = 'false';
     funcionalidadesRest.newFuncionalidadeByDescricao(token, descricao, function(data){
           if (data.hasOwnProperty('message')) {
                 message = data.message;
                 show = 'true';
           }
           funcionalidadesRest.getFuncionalidades(token, function(data){
                 showData(res, descricao, message, show, data, token);
           });
     });
     global.__token=token;
});

router.put('/descricao/:descricao/to/:novadescricao', function(req, res, next){
     token = global.__token;
     var descricao = req.params.descricao;
     var novadescricao = req.params.novadescricao;
     message = "";
     show = 'false';
     funcionalidadesRest.updateFuncionalidadeOnlyDescricao(token, descricao,novadescricao,function(data){
           if (data.hasOwnProperty('message')) {
                 message = data.message;
                 show = 'true';
           }
           funcionalidadesRest.getFuncionalidades(token, function(data){
                 showData(res, novadescricao, message, show, data, token);
           });
     });
     global.__token=token;
});

router.delete('/descricao/:descricao', function(req, res, next){
     token = global.__token;
     var descricao = req.params.descricao;
     message = "";
     show = 'false';
     funcionalidadesRest.deleteFuncionalidadeByDescricao(token, descricao, function(data){
           if (data.hasOwnProperty('message')) {
                 message = data.message;
                 show = 'true';
           }
           funcionalidadesRest.getFuncionalidades(token, function(data){
                 showData(res, descricao, message, show, data, token);
           });
     });
     global.__token=token;
});

router.post('/', function(req, res, next) {
    token = global.__token;
    funcionalidadesRest.getFuncionalidades(token, function(data){
         message = "";
         show = 'false';
         showData(res, descricao, message, show, data, token);
    });
    global.__token=token;
});

module.exports = router;
