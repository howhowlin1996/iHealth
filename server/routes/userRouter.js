var express = require('express');
var router = express.Router();
var userController=require('../controller/userController')

/* GET home page. */
router.post('/user/signUp', async function(req, res, next) {
  console.log(req.body,'here');
  let response=await userController.signUpController(req.body,req.query.category);
  res.status(200).send({status:response});
});

router.post('/user/signIn', async function(req, res, next) {
  console.log(req.body,'here');
  let response=await userController.signInController(req.body,req.query.category);
  res.status(200).send(response);
});
module.exports = router;