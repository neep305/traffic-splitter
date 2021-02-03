const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const uuid = req.query.uuid || 0;
  const variant = req.query.variant || 'A';
  let color = 'red';
  if (variant !== 'A') {
    color = 'blue';
  }
  res.render('index', { color: color });
});

//nocache 처리
const nocache = (req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}

router.use('/api', nocache, require('./api'));

module.exports = router;
