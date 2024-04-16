var express = require('express');
var router = express.Router();
const data=require('../controller/data');
const {checkAuth} = require('../middleware/auth');
/* GET home page. */
router.get('/',data.getData);
router.post('/',data.postData)
router.get('/planner',data.planner)
router.post('/planner',data.getPlan);

module.exports = router;
