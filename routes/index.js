var express = require('express');
var router = express.Router();
const {csrfProtection} = require('./utils')
/* GET home page. */
router.get('/', csrfProtection, function(req, res, next) {
  res.render('index', { title: 'GoodFilms Home', csrfToken:req.csrfToken() });
});

module.exports = router;
