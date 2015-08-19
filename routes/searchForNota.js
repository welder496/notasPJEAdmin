var express = require('express');
var router = express.Router();
var notasRest = require('notasrest');
var tags = require('./tags');
var arquivos = require('./arquivos');

/* GET */
router.get('/', function(req, res, next) {
    notasRest.getFirstNotas(function(data){
       for (var i=0; i < data.length; i++){
           data[i].tags = tags(data[i].tags);
           data[i].arquivos = arquivos(data[i].codigo,data[i].arquivos);
       }
       res.render('searchForNota',{results: data, show: 'false'});
    });
});

/* POST */
router.post('/', function(req, res, next) {
   var nota = req.body.searchNota;
   var del = req.body.comando;
   if (typeof(del) == "undefined") {
      if (typeof(nota) != "undefined" && nota) {
         notasRest.getNotasLike(nota, function(data){
            for (var i=0; i < data.length; i++){
                  data[i].tags = tags(data[i].tags);
                  data[i].arquivos = arquivos(data[i].codigo,data[i].arquivos);
            }
             if (data.hasOwnProperty('message'))
                res.render('searchForNota',{results: null, show: 'true', message: data.message});
             else
                res.render('searchForNota',{results: data, show: 'false'});
         });
      } else {
         notasRest.getFirstNotas(function(data){
             for (var i=0; i < data.length; i++){
                  data[i].tags = tags(data[i].tags);
                  data[i].arquivos = arquivos(data[i].codigo,data[i].arquivos);
             }
             res.render('searchForNota',{results: data, show: 'false'});
         });
      }
   } else {
         var codigo = req.body.codigo;
         notasRest.deleteNotaByCodigo(codigo,function(data){
             var dat = data;
             notasRest.getFirstNotas(function(data){
                   for (var i=0; i < data.length; i++){
                        data[i].tags = tags(data[i].tags);
                        data[i].arquivos = arquivos(data[i].codigo,data[i].arquivos);
                   }
                   res.render('searchForNota',{results: data, show: 'true', message: dat.message});
             });
         });
   }
});


module.exports = router;