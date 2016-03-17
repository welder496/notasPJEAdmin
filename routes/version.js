var express = require('express');
var router = express.Router();
var notasRest = require('notasrest');
var token = global.__token;

router.get('/',function(req,res,next){
      token = global.__token;
      var codigo = req.query.codigo;
      notasRest.getNotaVersao(token, codigo, function(data){
            res.json({versao: data});
      });
});

router.post('/',function(req,res,next){
      token = req.body.token;
      var codigo = req.body.codigo;
      notasRest.getNotaVersao(token, codigo, function(data){
            res.json({versao: data});
      });
      global.__token = token;
})

module.exports = router;