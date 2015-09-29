var express = require('express');
var router = express.Router();
var contadorRest = require('contadorrest');

router.get('/',function(req, res){
      res.render('contador');
});

router.post('/',function(req, res){
      res.render('contador');
});


module.exports = router;
