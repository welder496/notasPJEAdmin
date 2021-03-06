var express = require('express');
var router = express.Router();
var notasRest = require('notasrest');

router.get('/', function(req, res, next){
   res.end();
});

router.delete('/', function(req, res, next){
   var codigo = req.body.codigo;
   var documento = req.body.value;
   var message = '';
   var versao =  0;
   notasRest.deleteDocument(codigo, documento, function(data){
      if (data.hasOwnProperty('message')) {
         message = data.message;
      }
      notasRest.getNotaByCodigo(codigo, function(data){
         if (data.hasOwnProperty('message')) {
            message = data.message;
         }
         if (data.hasOwnProperty('codigo')) {
            versao = parseInt(data.versao);
         }
      })
   });
  res.end();
});

router.post('/', function(req, res, next){
   var codigo = req.body.codigo;
   var documento = req.body.value;
   var message = '';
   notasRest.getNotaByCodigo(codigo, function(data){
      if (data.hasOwnProperty('message')){
         message = data.message;
         res.render('edit',{message: message, show: 'true'});
      }
      if (data.hasOwnProperty('codigo')) {
         var id = data._id;
         notasRest.getDocument(id+'/'+documento, function(data){
             if (data.hasOwnProperty('message')){
                  message = data.message;
                  res.render('edit',{message: message, show: 'true'});
             } else
             if (data) {
                 res.send(data);
             }
         });
      }
  });
});

module.exports = router;