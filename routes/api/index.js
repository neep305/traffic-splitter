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
  let variation = req.body.variation;
  winston.debug(`expInfo call. userId: ${userId}, variation: ${variation}`);

  // Traffic is allocating by switching flag. 50:50
  if (_checkNewUser(userId)) {
    winston.debug(`${userId} is a new visitor`);

    // flag to switch the variation
    prev = !prev;

    if (prev) variation = 'A';
    else variation = 'B';
  }
  
  // Counting visits of each userId
  if (trafficCount[variation] === undefined) {
    trafficCount[variation] = {count: 0};
  }
  trafficCount[variation].count += 1;
  winston.debug(`trafficAllocCount: ${JSON.stringify(trafficCount)}`);

  // Initialize visitData. 
  if (visitData[userId] === undefined) { // If you're a new visitor
    visitData[userId] = { variation: variation, visits: 0 };
  }
  // Add visit count
  visitData[userId] = {userId: userId, variation: variation, visits: visitData[userId].visits + 1}
  
  // return result
  res.status(201).json({
    result: 'success', data: visitData[userId]
  });
});

/**
 * check the userId received and distinguish whether it is a new visitor
 * @param {string} userId
 * @returns {boolean} 
 */
const _checkNewUser = (userId) => {
  let isNewUser = false;
  if (visitData[userId] == undefined) {
    isNewUser = true;
  }
  return isNewUser;
}

module.exports = router;