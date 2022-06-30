var express = require('express');
var router = express.Router();
var medicalController=require('../controller/medicalController')

/* GET home page. */
router.post('/medical/clinic', async function(req, res, next) {
  console.log(req.body,'here');
  let response=await medicalController.getClinicInform(req.body,req.query.type);
  console.log(response);
  res.status(200).send({status:response});
});


module.exports = router;