var express = require('express');
var router = express.Router();
var notasRest = require('notasrest');
var tags = require('./tags');
var arquivos = require('./arquivos');

var showData = function(res, message, show, data){
       var results = "";
       if ((data instanceof Array) && (data.length != 0)) {
             for (var i=0; i < data.length; i++){
                   data[i].tags = tags(data[i].tags);
                   data[i].arquivos = arquivos(data[i].codigo,data[i].arquivos);
             }
             results = data;
      }
      res.render('searchForNota', {results: results, message: message, show: show});
};

/* GET */
router.get('/', function(req, res, next) {
       var message = "";
       var show = 'false';
       notasRest.getFirstNotas(function(data){
             showData(res, message, show, data);
       });
});

/* POST */
router.post('/', function(req, res, next) {
      var message = "";
      var show = 'false';
      var nota = req.body.searchNota;
      var del = req.body.comando;
      if (typeof(del) == "undefined") {
             if (typeof(nota) != "undefined" && nota) {
                   notasRest.getNotasLike(nota, function(data){
                          showData(res, message, show, data);
                   });
             } else {
                   notasRest.getFirstNotas(function(data){
                          showData(res, message, show, data);
                   });
             }
      } else {
             var codigo = req.body.codigo;
             notasRest.deleteNotaByCodigo(codigo,function(data){
                   if (data.hasOwnProperty('message')){
                          message = data.message;
                          show = 'true';
                   }
                   notasRest.getFirstNotas(function(data){
                          showData(res, message, show, data);
                   });
             });
      }
});


module.exports = router;