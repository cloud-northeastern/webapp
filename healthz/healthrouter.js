const {checkHealth,allHealth} = require('./healthcontroller')

const router = require('express').Router();
router.get('/', checkHealth)
router.all('/',allHealth)
module.exports = router