const router = require('express').Router();
const winston = require(`${__basedir}/config/winston`);
let visitData = {}; // as a database 
let trafficCount = {};  // traffic statistics
let prev = false;

router.get('/', (req, res, next) => {
  winston.debug("API CALL")
  res.render('index', { title: 'Express' });
});

router.post('/expInfo', (req, res) => {
  const userId = req.body.userId || 'anonymous';
  let variant = req.body.variant;
  winston.debug(`expInfo call. userId: ${userId}, variant: ${variant}`);
  // alloc a new variant (50:50)
  if (_checkNewUser(userId)) {
    winston.debug(`${userId} is a new visitor`);
    prev = !prev;

    if (prev) variant = 'A';
    else variant = 'B';
  }
  
  // only for checking the number of each variant
  if (trafficCount[variant] === undefined) {
    trafficCount[variant] = {count: 0};
  }
  trafficCount[variant].count += 1;
  winston.debug(`trafficAllocCount: ${JSON.stringify(trafficCount)}`);

  // init visitData
  if (visitData[userId] === undefined) {
    visitData[userId] = { variant: variant, visits: 0 };
  }
  visitData[userId] = {userId: userId, variant: variant, visits: visitData[userId].visits + 1}
  
  // return result
  res.status(201).json({
    result: 'success', data: visitData[userId]
  });
});

const _getVariantId = (max) => {
  // const variant = Math.floor(Math.random() * Math.floor(max)) === 0 ? 'A' : 'B';
  const variant = Math.random() > 0.5 ? 'A' : 'B';
  return variant;
}

const _trafficAlloc = (prev) => {
  return !prev
}

const _checkNewUser = (userId) => {
  let isNewUser = false;
  if (visitData[userId] == undefined) {
    isNewUser = true;
  }
  return isNewUser;
}

module.exports = router;