var express = require('express');
var router = express.Router();
var userController=require('../controller/recordController')

/* GET home page. */
router.post('/record/insert', async function(req, res, next) {
  console.log(req.body,'here');
  let response=await userController. insertRecord(req.body,req.query.id);
  res.status(200).send({status:response});
});

router.get('/record/get', async function(req, res, next) {
  console.log(req.query.id,'here');
  let response=await userController.getRecord(req.query.id);
  res.status(200).send(response);
});


module.exports = router;