var express = require('express');
var router = express.Router();
var contadorRest = require('contadorrest');

var show = 'false';
var message = "";

var showData = function(res, descricao, prefixo, contador, casas, message, show, data){
      var contadores = "";
      if ((data instanceof Array) && (data.length != 0)) {
             contadores = data;
      }
      res.render('contador',{contadores: contadores, descricao: descricao, prefixo: prefixo, contador: contador, casas: casas, message: message, show: show});
};

router.get('/',function(req, res){
      var prefixo = "";
      var descricao = "";
      var show = 'false';
      var message = "";
      var contador = "";
      var casas = "";
      contadorRest.getContadores(function(data){
            if ((data instanceof Array) && (data.length != 0)) {
                    prefixo = data[0].prefixo;
                    descricao = data[0].descricao;
                    contador = data[0].contador;
                    casas = data[0].casas;
            }
            showData(res, descricao, prefixo, contador, casas, message, show, data);
      });
});


router.delete('/descricao/:descricao', function(req, res){
      var descricao = req.params.descricao;
      var prefixo = "";
      var show = 'false';
      var message = "";
      var contador = "";
      var casas = "";
      contadorRest.deleteContadorByDescricao(descricao, function(data){
                   if (data.hasOwnProperty('message')){
                             message = data.message;
                             show = 'true';
                   }
                   contadorRest.getContadores(function(data){
                             if ((data instanceof Array) && (data.length != 0)) {
                                       prefixo = data[0].prefixo;
                                       descricao = data[0].descricao;
                                       contador = data[0].contador;
                                       casas = data[0].casas;
                             }
                             showData(res, descricao, prefixo, contador, casas, message, show, data);
                   });
      });
});

router.get('/descricao/:descricao', function(req, res){
      var descricao = req.params.descricao;
      var prefixo = "";
      var show = 'false';
      var message = "";
      var contador = "";
      var casas = "";
      contadorRest.getContadorByDescricao(descricao, function(data){
                   prefixo = data.prefixo;
                   descricao = data.descricao;
                   contador = data.contador;
                   casas = data.casas;
                   contadorRest.getContadores(function(data){
                             var contadores = data;
                             showData(res, descricao, prefixo, contador, casas, message, show, contadores);
                   });
      });
});

router.put('/descricao/:descricao', function(req, res){
      var descricao = req.params.descricao;
      var prefixo = "";
      var show = 'false';
      var message = "";
      var contador = "";
      var casas = "";
      contadorRest.updateContador(descricao, {descricao: req.body.descricao, prefixo: req.body.prefixo, contador: req.body.contador, casas: req.body.casas}, function(data){
                   if (data.hasOwnProperty('message')) {
                             message = data.message;
                             show = 'true';
                   }
                   contadorRest.getContadorByDescricao(descricao, function(data){
                             prefixo = data.prefixo;
                             descricao = data.descricao;
                             contador = data.contador;
                             casas = data.casas;
                             contadorRest.getContadores(function(data){
                                     var contadores = data;
                                     showData(res, descricao, prefixo, contador, casas, message, show, contadores);
                             });
                  });
      });
});

router.put('/prefixo/:prefixo/inc', function(req, res){
         var prefixo = req.params.prefixo;
         var message = "";
         var show = "";
         contadorRest.incContadorByPrefixo(prefixo,function(data){
               if (data.hasOwnProperty('message')) {
                  message = data.message;
                  show = 'true';
               }
               contadorRest.getContadorByPrefixo(prefixo, function(data){
                             prefixo = data.prefixo;
                             descricao = data.descricao;
                             contador = data.contador;
                             casas = data.casas;
                             contadorRest.getContadores(function(data){
                                     var contadores = data;
                                     showData(res, descricao, prefixo, contador, casas, message, show, contadores);
                             });
               });
         });
});

router.put('/prefixo/:prefixo/dec', function(req, res){
         var prefixo = req.params.prefixo;
         var message = "";
         var show = "";
         contadorRest.decContadorByPrefixo(prefixo,function(data){
               if (data.hasOwnProperty('message')) {
                  message = data.message;
                  show = 'true';
               }
               contadorRest.getContadorByPrefixo(prefixo, function(data){
                             prefixo = data.prefixo;
                             descricao = data.descricao;
                             contador = data.contador;
                             casas = data.casas;
                             contadorRest.getContadores(function(data){
                                     var contadores = data;
                                     showData(res, descricao, prefixo, contador, casas, message, show, contadores);
                             });
               });
         });
});

router.put('/prefixo/:prefixo/reset', function(req, res){
         var prefixo = req.params.prefixo;
         var message = "";
         var show = "";
         contadorRest.resetContadorByPrefixo(prefixo, function(data){
               if (data.hasOwnProperty('message')) {
                  message = data.message;
                  show = 'true';
               }
               contadorRest.getContadorByPrefixo(prefixo, function(data){
                             prefixo = data.prefixo;
                             descricao = data.descricao;
                             contador = data.contador;
                             casas = data.casas;
                             contadorRest.getContadores(function(data){
                                     var contadores = data;
                                     showData(res, descricao, prefixo, contador, casas, message, show, contadores);
                             });
               });
         });
});

router.post('/new', function(req,res){
      var prefixo = req.body.prefixo;
      var descricao = req.body.descricao;
      var show = 'false';
      var message = "";
      var contador = "";
      var casas = "";
      contadorRest.newContador({prefixo: prefixo, descricao: descricao}, function(data){
            if (data.hasOwnProperty('message')) {
                    message = data.message;
                    show = 'true';
            }
            contadorRest.getContadores(function(data){
                   if ((data instanceof Array) && (data.length != 0)) {
                             prefixo = data[0].prefixo;
                             descricao = data[0].descricao;
                             contador = data[0].contador;
                             casas = data[0].casas;
                   }
                   showData(res, descricao, prefixo, contador, casas, message, show, data);
            });
      });
});


router.post('/',function(req, res){
      var prefixo = "";
      var show = 'false';
      var message = "";
      var contador = "";
      var descricao = "";
      var casas = "";
      contadorRest.getContadores(function(data){
            if ((data instanceof Array) && (data.length != 0)) {
                   prefixo = data[0].prefixo;
                   descricao = data[0].descricao;
                   contador = data[0].contador;
                   casas = data[0].casas;
            }
            showData(res, descricao, prefixo, contador, casas, message, show, data);
      });
});


module.exports = router;
