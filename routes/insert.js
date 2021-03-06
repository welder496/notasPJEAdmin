var express = require('express');
var router = express.Router();
var notasRest = require('notasrest');
var perfilRest = require('perfilrest');
var funcionalidadeRest = require('funcionalidaderest');
var contadorRest = require('contadorrest');
var rest = require('restler');
var fs = require('fs');
var token = global.__token;

/* GET home page. */
router.get('/', function(req, res) {
      token = global.__token;
      var perfils = "";
      var codigo = "";
      var nota = "";
      var tags = "";
      var message = "";
      var contadores = "";
      var funcionalidades = "";
      var descricao = "";
      var subTipos = "";
      var show = 'false';
      contadorRest.getContadores(token, function(data){
           if ((data instanceof Array) && (data.length != 0)) {
                 contadores = data;
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
                            res.render('insert',{codigo: codigo, nota: nota, tags: tags, perfils: perfils, contadores: contadores, funcionalidades: funcionalidades, subTipos: subTipos, message: message, show: show, token: token});
                      });
                });
           });
      });
});

/* GET contador */
router.get('/prefixo/:prefixo/next', function(req, res) {
      token = global.__token;
      var prefixo = req.params.prefixo;
      contadorRest.getNextContadorByPrefixo(token, prefixo, function(data){
            res.send(data);
      });
});

/* GET search contador */
router.get('/prefixo/:prefixo/searchnext', function(req,res) {
      token = global.__token;
      var prefixo = req.params.prefixo;
      contadorRest.searchNextContadorByPrefixo(token, prefixo, function(data){
            res.send(data);
      });

});

/* GET funcionalidade subtipo */
router.get('/funcionalidade/:descricao', function(req, res) {
      token = global.__token;
      /* Do not change this object */
      var descricao = req.params.descricao;
      var perfils = "";
      var funcionalidades = "";
      var subTipos = "";
      funcionalidadeRest.getFuncionalidadeByDescricao(token, descricao, function(data){
             if ((data.subtipos instanceof Array) && (data.subtipos.length != 0)) {
                   subTipos = data.subtipos;
             }
             res.send(subTipos);
      });
});

/* POST home page */
router.post('/',function(req, res){
   token = req.body.token;
   /* Do not change this object */
   var codigo = "";
   var nota = "";
   var prefixo = "";
   var tags = "";
   var perfils = "";
   var message = "";
   var funcionalidades = "";
   var contadores = "";
   var subTipos = "";
   var descricao = "";
   var show = "false";
   var notadata ={'codigo':'','nota':'','tags':'','versao':'',};
   if (req.body) {
      if (req.body.prefixCodigo){
         prefixo = req.body.prefixCodigo;
      }
      if (req.body.codigo) {
          notadata['codigo'] = req.body.codigo;
          codigo = req.body.codigo;
      }
      if (req.body.nota) {
          notadata['nota'] = req.body.nota;
          nota = req.body.nota;
      }
      if (req.body.tags) {
          notadata['tags'] = req.body.tags;
      }
      notadata['versao'] = parseInt(0);
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
   contadorRest.getNextContadorByPrefixo(token, prefixo, function(data){
       if (data.hasOwnProperty('message')) {
           //Do nothing here!!
       } else {
           notadata['codigo'] = data;
           codigo = data;
       }
       var vector = notadata['tags'];
       vector = vector.split(',');
       var found = false;
       for (var i=0; i < vector.length; i++){
           if (vector[i] == notadata['codigo']) {
                 found = true;
           }
       }
       if (! found) {
            notadata['tags']=notadata['codigo']+','+notadata['tags'];
       }
       notasRest.newNota(token, notadata,function(data){
          if (data.hasOwnProperty('message')){
                 message = data.message;
                 show = 'true';
          }
          contadorRest.getContadores(token, function(data){
                 if ((data instanceof Array) && (data.length != 0)) {
                       contadores = data;
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
                                    res.render('insert',{codigo: codigo, nota: nota, tags: tags, contadores: contadores, perfils: perfils, funcionalidades: funcionalidades, subTipos: subTipos, message: message, show: show, token: token});
                             });
                       });
                 });
          });
       });
   });
   global.__token = token;
});

module.exports = router;