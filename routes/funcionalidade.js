var express = require('express');
var router = express.Router();
var funcionalidadesRest = require('funcionalidaderest');

var descricao = "";
var message = "";
var show = 'false';

var showData = function(res, descricao, message, show, data){
    var funcionalidades = "";
    var subTipos = "";
    if ((data instanceof Array) && (data.length != 0)) {
             funcionalidades = data;
             if (descricao == "")
                   descricao = funcionalidades[0].descricao;
             funcionalidadesRest.getFuncionalidadeByDescricao(descricao,function(data){
                   if ((data.subtipos instanceof Array) && (data.subtipos.length != 0)) {
                          subTipos = data.subtipos;
                   }
                   res.render('funcionalidade',{funcionalidades: funcionalidades, subTipos: subTipos, message: message, show: show});
             });
    } else {
             res.render('funcionalidade',{funcionalidades: funcionalidades, subTipos: subTipos, message: message, show: show});
    }
};

/* GET home page. */
router.get('/', function(req, res, next) {
    message = "";
    show = 'false';
    funcionalidadesRest.getFuncionalidades(function(data){
          showData(res, descricao, message, show, data);
    });
});

router.get('/descricao/:descricao', function(req,res, next){
    var descricao = req.params.descricao;
    message = "";
    show = 'false';
    funcionalidadesRest.getFuncionalidades(function(data){
           showData(res, descricao, message, show, data);
    });
});

router.post('/descricao/:descricao/subtipo/:subtipo', function(req,res,next){
    var descricao = req.params.descricao;
    var subtipo = req.params.subtipo;
    message = "";
    show = 'false';
    funcionalidadesRest.getFuncionalidades(function(data){
          if ((data instanceof Array) && (data.length != 0)) {
                    funcionalidades = data;
                    funcionalidadesRest.newFuncionalidadeSubTipo(descricao,subtipo, function(data){
                          if (data.hasOwnProperty('message')){
                                message = data.message;
                                show = 'true';
                          }
                          showData(res, descricao, message, show, funcionalidades);
                    });
          } else {
                   res.render('funcionalidade',{funcionalidades: funcionalidades, subTipos: subTipos, message: message, show: show});
          }
    });
});

router.delete('/descricao/:descricao/subtipo/:subtipo', function(req, res, next){
    var descricao = req.params.descricao;
    var subTipo = req.params.subtipo;
    message = "";
    show = 'false';
    funcionalidadesRest.getFuncionalidades(function(data){
          if ((data instanceof Array) && (data.length != 0)) {
                   funcionalidades = data;
                   funcionalidadesRest.deleteFuncionalidadeSubTipo(descricao,subTipo, function(data){
                          if (data.hasOwnProperty('message')){
                                message = data.message;
                                show = 'true';
                          }
                          showData(res, descricao, message, show, funcionalidades);
                   });
          } else {
                   res.render('funcionalidade',{funcionalidades: funcionalidades, subTipos: subTipos, message: message, show: show});
          }
    });
});

router.put('/descricao/:descricao/subtipo/:subtipo/to/:newsubtipo', function(req, res, next){
    var descricao = req.params.descricao;
    var subTipo = req.params.subtipo;
    var newsubTipo = req.params.newsubtipo;
    message = "";
    show = 'false';
    funcionalidadesRest.getFuncionalidades(function(data){
          if ((data instanceof Array) && (data.length != 0)) {
                   funcionalidades = data;
                   funcionalidadesRest.updateFuncionalidadeSubTipo(descricao,subTipo,newsubTipo, function(data){
                          if (data.hasOwnProperty('message')){
                                message = data.message;
                                show = 'true';
                          }
                          showData(res, descricao, message, show, funcionalidades);
                   });
         } else {
                   res.render('funcionalidade',{funcionalidades: funcionalidades, subTipos: subTipos, message: message, show: show});
         }
    });
});

router.post('/descricao/:descricao', function(req, res, next){
   var descricao = req.params.descricao;
   message = "";
   show = 'false';
   funcionalidadesRest.newFuncionalidadeByDescricao(descricao,function(data){
         if (data.hasOwnProperty('message')) {
                   message = data.message;
                   show = 'true';
         }
         funcionalidadesRest.getFuncionalidades(function(data){
                showData(res, descricao, message, show, data);
         });
   });
});

router.put('/descricao/:descricao/to/:novadescricao', function(req, res, next){
   var descricao = req.params.descricao;
   var novadescricao = req.params.novadescricao;
   message = "";
   show = 'false';
   funcionalidadesRest.updateFuncionalidadeOnlyDescricao(descricao,novadescricao,function(data){
             if (data.hasOwnProperty('message')) {
                   message = data.message;
                   show = 'true';
             }
             funcionalidadesRest.getFuncionalidades(function(data){
                   showData(res, novadescricao, message, show, data);
             });
   });
});

router.delete('/descricao/:descricao', function(req, res, next){
   var descricao = req.params.descricao;
   message = "";
   show = 'false';
   funcionalidadesRest.deleteFuncionalidadeByDescricao(descricao, function(data){
             if (data.hasOwnProperty('message')) {
                   message = data.message;
                   show = 'true';
             }
             funcionalidadesRest.getFuncionalidades(function(data){
                   showData(res, descricao, message, show, data);
             });
   });
});

router.post('/', function(req, res, next) {
    funcionalidadesRest.getFuncionalidades(function(data){
         message = "";
         show = 'false';
         showData(res, descricao, message, show, data);
    });
});

module.exports = router;
