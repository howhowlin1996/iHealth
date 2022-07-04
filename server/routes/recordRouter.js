var express = require('express');
var router = express.Router();
var userController=require('../controller/recordController')

/* GET home page. */
router.post('/record/insert', async function(req, res, next) {
  console.log(req.body,'here');
  let response=await userController. insertRecord(req.body,req.query.id);
  res.status(200).send({status:response});
});


module.exports = router;