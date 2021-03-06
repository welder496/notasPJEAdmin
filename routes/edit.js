var express = require('express');
var router = express.Router();
var notasRest = require('notasrest');
var perfilRest = require('perfilrest');
var funcionalidadeRest = require('funcionalidaderest');
var rest = require('restler');
var fs = require('fs');
var token = global.__token;

/* GET home page. */
router.get('/', function(req, res, next) {
   token = global.__token;
   var codigo = req.body.codigo;
   var versao = 0;
   var nota = "";
   var tags = "";
   var arquivos = "";
   var perfils = "";
   var funcionalidades = "";
   var subTipos = "";
   var message = "";
   var show = 'false';
   notasRest.getNotaByCodigo(token, codigo, function(data){
      console.log(data);
      versao = data.__v;
      nota = data.nota;
      tags = data.tags;
      arquivos = data.arquivos;
      perfilRest.getPerfils(token, function(data){
             if ((data instanceof Array) && (data.length != 0)) {
                    perfils = data;
             }
             funcionalidadeRest.getFuncionalidades(token, function(data){
                   if ((data instanceof Array) && (data.length != 0)) {
                          funcionalidades = data;
                          descricao = funcionalidades[0].descricao;
                   }
                   funcionalidadeRest.getFuncionalidadeByDescricao(token, descricao, function(data){
                          if ((data.subtipos instanceof Array) && (data.subtipos.length != 0)) {
                                subTipos = data.subtipos;
                          }
                         res.render('edit', {codigo: codigo, nota: nota, tags: tags, arquivos: arquivos, versao: versao, perfils: perfils, funcionalidades: funcionalidades, subTipos: subTipos, message: message, show:show, token: token});
                   });
             });
      });
   });
});

/* GET funcionalidade subtipo */
router.get('/funcionalidade/:descricao', function(req, res, next) {
      /* Do not change this object */
      token = global.__token;
      var descricao = req.params.descricao;
      var perfils = "";
      var message = "";
      var funcionalidades = "";
      var subTipos = "";
      var show = "false";
      perfilRest.getPerfils(token, function(data){
             if ((data instanceof Array) && (data.length != 0)) {
                    perfils = data;
             }
             funcionalidadeRest.getFuncionalidades(token, function(data){
                   if ((data instanceof Array) && (data.length != 0)) {
                          funcionalidades = data;
                   }
                   funcionalidadeRest.getFuncionalidadeByDescricao(token, descricao, function(data){
                          if ((data.subtipos instanceof Array) && (data.subtipos.length != 0)) {
                                subTipos = data.subtipos;
                          }
                          res.send(subTipos);
                   });
             });
      });
});

router.post('/', function(req, res, next){
   token = req.body.token;
   var codigo = req.body.codigo;
   var comando = req.body.comando;
   if (comando == 'edit') {
       token = global.__token;
   } else {
       token = req.body.token;
   }
   var versao = 0;
   var nota = "";
   var tags = "";
   var arquivos = "";
   var message = "";
   var show = 'false';
   notasRest.getNotaByCodigo(token, codigo, function(data){
      if (data.hasOwnProperty('codigo')){
             versao = parseInt(data.__v);
             nota = data.nota;
             tags = data.tags;
             arquivos = data.arquivos;
      }
      if (data.hasOwnProperty('message')){
             message = data.message;
             show = 'true';
      }
   });
   if (comando == 'edit') {
      perfilRest.getPerfils(token, function(data){
             if ((data instanceof Array) && (data.length != 0)) {
                    perfils = data;
             }
             funcionalidadeRest.getFuncionalidades(token, function(data){
                   if ((data instanceof Array) && (data.length != 0)) {
                          funcionalidades = data;
                          descricao = funcionalidades[0].descricao;
                   }
                   funcionalidadeRest.getFuncionalidadeByDescricao(token, descricao, function(data){
                          if ((data.subtipos instanceof Array) && (data.subtipos.length != 0)) {
                                subTipos = data.subtipos;
                          }
                         res.render('edit', {codigo: codigo, nota: nota, tags: tags, arquivos: arquivos, versao: versao, perfils: perfils, funcionalidades: funcionalidades, subTipos: subTipos, message: message, show:show, token: token});
                   });
             });
      });
   } else
    if (comando == 'post'){
       var notadata ={'codigo':'','nota':'','tags':'','versao':'',};
       if (req.body) {
             if (req.body.codigo)
                   notadata['codigo'] = req.body.codigo;
             if (req.body.nota)
                   notadata['nota'] = req.body.nota;
             if (req.body.tags)
                   notadata['tags'] = req.body.tags;
             notadata['versao'] = parseInt(req.body.versao);
       }
       var files = req.files.file;
       if (files) {
             if (files.length > 1){
                   files.forEach(function(file,i){
                          notadata['file'+i]=rest.file(file.path,null,file.size,null,file.mimetype);
                   });
             } else {
                   var file = req.files.file;
                   notadata['file0']=rest.file(file.path,null,file.size,null,file.mimetype);
             }
       }
       var vector = notadata['tags'];
       vector = vector.split(',');
       var found = false;
       for (var i=0; i < vector.length; i++){
             if (vector[i] == notadata['codigo']) {
                   found = true;
             }
       }
       if (! found)
             notadata['tags']=notadata['codigo']+','+notadata['tags'];
       notasRest.updateNotaByCodigo(token, codigo,notadata, function(data){
             if (data.hasOwnProperty('message')){
                   message = data.message;
                   show = 'true';
             }
             notasRest.getNotaByCodigo(token, codigo, function(data){
                   if (data.hasOwnProperty('codigo')){
                          versao = parseInt(data.__v);
                          nota = data.nota;
                          tags = data.tags;
                          arquivos = data.arquivos;
                   }
                   if (data.hasOwnProperty('message')){
                          message = data.message;
                          show = 'true';
                   }
                   perfilRest.getPerfils(token, function(data){
                          if ((data instanceof Array) && (data.length != 0)) {
                                perfils = data;
                          }
                          funcionalidadeRest.getFuncionalidades(token, function(data){
                                if ((data instanceof Array) && (data.length != 0)) {
                                       funcionalidades = data;
                                       descricao = funcionalidades[0].descricao;
                                }
                                funcionalidadeRest.getFuncionalidadeByDescricao(token, descricao, function(data){
                                       if ((data.subtipos instanceof Array) && (data.subtipos.length != 0)) {
                                             subTipos = data.subtipos;
                                      }
                                      res.render('edit',{codigo: codigo, nota: nota, tags: tags, arquivos: arquivos, versao: versao, perfils: perfils, funcionalidades: funcionalidades, subTipos: subTipos, message: message, show:show, token: token});
                                });
                          });
                   });
             });
       });
   }
   global.__token = token;
});

module.exports = router;