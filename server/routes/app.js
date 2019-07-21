var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'connorandsam' });
  res.sendFile(path.join(__dirname, 'dist/connorandsam/index.html'));
});

module.exports = router;