var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('perfil');
});

router.post('/', function(req, res, next){
  res.render('perfil');
});

module.exports = router;
