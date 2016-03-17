var express = require('express');
var router = express.Router();
var notasRest = require('notasrest');
var tags = require('./tags');
var arquivos = require('./arquivos');
var token = global.__token;

var showData = function(res, message, show, data, token){
       var results = "";
       if ((data instanceof Array) && (data.length != 0)) {
             for (var i=0; i < data.length; i++){
                   data[i].tags = tags(data[i].tags);
                   data[i].arquivos = arquivos(data[i].codigo,data[i].arquivos);
             }
             results = data;
      }
      res.render('searchForCodigo', {results: results, message: message, show: show, token: token});
};


/* GET */
router.get('/', function(req, res, next){
   token = global.__token;
   var message = "";
   var show = 'false';
   var codigo = req.body.searchCodigo;
   if (typeof(codigo) == "undefined" || codigo=="") {
      notasRest.getFirstNotas(token, function(data){
            showData(res, message, show, data, token);
      });
   } else {
      notasRest.getNotaByCodigoLike(token, codigo, function(data){
            showData(res, message, show, data, token);
      });
   }
});

/* POST */
router.post('/', function(req, res, next) {
   token = req.body.token;
   var message = "";
   var show = 'false';
   var codigo = req.body.codigo || req.body.searchCodigo;
   var del = req.body.comando;
   if (typeof(del) == "undefined") {
      if (typeof(codigo) == "undefined" || codigo=="") {
               notasRest.getFirstNotas(token, function(data){
                        showData(res, message, show, data, token);
               });
      } else {
         notasRest.getNotaByCodigoLike(token, codigo, function(data){
                if (data.hasOwnProperty('message')){
                         message = data.message;
                         show = 'true';
                }
                showData(res, message, show, data, token);
         });
      }
    } else {
         token = global.__token;
         notasRest.deleteNotaByCodigo(token, codigo,function(data){
                if (data.hasOwnProperty('message')){
                         message = data.message;
                         show = 'true';
                }
               notasRest.getFirstNotas(token, function(data){
                         showData(res, message, show, data, token);
               });
         });
    }
    global.__token = token;
});


module.exports = router;