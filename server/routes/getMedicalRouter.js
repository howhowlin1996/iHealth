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

router.get('/medical/clinic', async function(req, res, next) {
  console.log(req.query.type);
  let response=await medicalController.getClinicInform(null,req.query.type);
  console.log(response);
  res.status(200).send({status:response});
});

router.post('/medical/drugStore', async function(req, res, next) {
  console.log(req.body,'here');
  let response=await medicalController.getClinicInform(req.body,'drugStore');
  console.log(response);
  res.status(200).send({status:response});
});

router.post('/medical/individualInform', async function(req, res, next) {
  let response=await medicalController.getIndividualInform(req.body['id'],req.body['type']);
  console.log(response);
  res.status(200).send(response);
});


module.exports = router;