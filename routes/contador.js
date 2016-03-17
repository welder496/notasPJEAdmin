var express = require('express');
var router = express.Router();
var contadorRest = require('contadorrest');
var token = global.__token;

var show = 'false';
var message = "";

var showData = function(res, descricao, prefixo, contador, casas, message, show, data, token){
      var contadores = "";
      if ((data instanceof Array) && (data.length != 0)) {
             contadores = data;
      }
      res.render('contador',{contadores: contadores, descricao: descricao, prefixo: prefixo, contador: contador, casas: casas, message: message, show: show, token: token});
};

router.get('/',function(req, res){
      token = global.__token;
      var prefixo = "";
      var descricao = "";
      var show = 'false';
      var message = "";
      var contador = "";
      var casas = "";
      contadorRest.getContadores(token, function(data){
            if ((data instanceof Array) && (data.length != 0)) {
                    prefixo = data[0].prefixo;
                    descricao = data[0].descricao;
                    contador = data[0].contador;
                    casas = data[0].casas;
            }
            showData(res, descricao, prefixo, contador, casas, message, show, data, token);
      });
});


router.delete('/descricao/:descricao', function(req, res){
      token = req.body.token;
      var descricao = req.params.descricao;
      var prefixo = "";
      var show = 'false';
      var message = "";
      var contador = "";
      var casas = "";
      contadorRest.deleteContadorByDescricao(token, descricao, function(data){
                   if (data.hasOwnProperty('message')){
                             message = data.message;
                             show = 'true';
                   }
                   contadorRest.getContadores(token, function(data){
                             if ((data instanceof Array) && (data.length != 0)) {
                                       prefixo = data[0].prefixo;
                                       descricao = data[0].descricao;
                                       contador = data[0].contador;
                                       casas = data[0].casas;
                             }
                             showData(res, descricao, prefixo, contador, casas, message, show, data, token);
                   });
      });
      global.__token = token;
});

router.get('/descricao/:descricao', function(req, res){
      token = global.__token;
      var descricao = req.params.descricao;
      var prefixo = "";
      var show = 'false';
      var message = "";
      var contador = "";
      var casas = "";
      contadorRest.getContadorByDescricao(token, descricao, function(data){
                   prefixo = data.prefixo;
                   descricao = data.descricao;
                   contador = data.contador;
                   casas = data.casas;
                   contadorRest.getContadores(token, function(data){
                             var contadores = data;
                             showData(res, descricao, prefixo, contador, casas, message, show, contadores, token);
                   });
      });
});

router.put('/descricao/:descricao', function(req, res){
      token = req.body.token;
      var descricao = req.params.descricao;
      var prefixo = "";
      var show = 'false';
      var message = "";
      var contador = "";
      var casas = "";
      contadorRest.updateContador(token, descricao, {descricao: req.body.descricao, prefixo: req.body.prefixo, contador: req.body.contador, casas: req.body.casas}, function(data){
                   if (data.hasOwnProperty('message')) {
                             message = data.message;
                             show = 'true';
                   }
                   contadorRest.getContadorByDescricao(token, descricao, function(data){
                             prefixo = data.prefixo;
                             descricao = data.descricao;
                             contador = data.contador;
                             casas = data.casas;
                             contadorRest.getContadores(token, function(data){
                                     var contadores = data;
                                     showData(res, descricao, prefixo, contador, casas, message, show, contadores, token);
                             });
                  });
      });
      global.__token = token;
});

router.put('/prefixo/:prefixo/inc', function(req, res){
      token = req.body.token;
      var prefixo = req.params.prefixo;
      var message = "";
      var show = "";
      contadorRest.incContadorByPrefixo(token, prefixo,function(data){
           if (data.hasOwnProperty('message')) {
                 message = data.message;
                 show = 'true';
           }
           contadorRest.getContadorByPrefixo(token, prefixo, function(data){
                 prefixo = data.prefixo;
                 descricao = data.descricao;
                 contador = data.contador;
                 casas = data.casas;
                 contadorRest.getContadores(token, function(data){
                       var contadores = data;
                       showData(res, descricao, prefixo, contador, casas, message, show, contadores, token);
                 });
           });
      });
      global.__token = token;
});

router.put('/prefixo/:prefixo/dec', function(req, res){
      token = req.body.token;
      var prefixo = req.params.prefixo;
      var message = "";
      var show = "";
      contadorRest.decContadorByPrefixo(token, prefixo,function(data){
           if (data.hasOwnProperty('message')) {
                 message = data.message;
                 show = 'true';
           }
           contadorRest.getContadorByPrefixo(token, prefixo, function(data){
                 prefixo = data.prefixo;
                 descricao = data.descricao;
                 contador = data.contador;
                 casas = data.casas;
                 contadorRest.getContadores(token, function(data){
                       var contadores = data;
                       showData(res, descricao, prefixo, contador, casas, message, show, contadores, token);
                 });
           });
      });
      global.__token = token;
});

router.put('/prefixo/:prefixo/reset', function(req, res){
      token = req.body.token;
      var prefixo = req.params.prefixo;
      var message = "";
      var show = "";
      contadorRest.resetContadorByPrefixo(token, prefixo, function(data){
           if (data.hasOwnProperty('message')) {
                 message = data.message;
                 show = 'true';
           }
           contadorRest.getContadorByPrefixo(token, prefixo, function(data){
                 prefixo = data.prefixo;
                 descricao = data.descricao;
                 contador = data.contador;
                 casas = data.casas;
                 contadorRest.getContadores(token, function(data){
                       var contadores = data;
                       showData(res, descricao, prefixo, contador, casas, message, show, contadores, token);
                 });
           });
      });
      global.__token = token;
});

router.post('/new', function(req,res){
      token = req.body.token;
      var prefixo = req.body.prefixo;
      var descricao = req.body.descricao;
      var show = 'false';
      var message = "";
      var contador = "";
      var casas = "";
      contadorRest.newContador(token, {prefixo: prefixo, descricao: descricao}, function(data){
            if (data.hasOwnProperty('message')) {
                    message = data.message;
                    show = 'true';
            }
            contadorRest.getContadores(token, function(data){
                   if ((data instanceof Array) && (data.length != 0)) {
                             prefixo = data[0].prefixo;
                             descricao = data[0].descricao;
                             contador = data[0].contador;
                             casas = data[0].casas;
                   }
                   showData(res, descricao, prefixo, contador, casas, message, show, data, token);
            });
      });
      global.__token = token;
});


router.post('/',function(req, res){
      token = req.body.token;
      var prefixo = "";
      var show = 'false';
      var message = "";
      var contador = "";
      var descricao = "";
      var casas = "";
      contadorRest.getContadores(token, function(data){
            if ((data instanceof Array) && (data.length != 0)) {
                   prefixo = data[0].prefixo;
                   descricao = data[0].descricao;
                   contador = data[0].contador;
                   casas = data[0].casas;
            }
            showData(res, descricao, prefixo, contador, casas, message, show, data, token);
      });
      global.__token = token;
});


module.exports = router;
