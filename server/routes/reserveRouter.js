var express = require('express');
var router = express.Router();
var reserveController=require('../controller/reserveController')
router.post('/reserve/createClinic', async function(req, res, next) {
       console.log(req.body);
       try{
        let response=await reserveController.insertClinicReserve(req.body['userId'],req.body['clientId']);
        console.log(response);
        res.status(200).send({response:response});
       }
       catch(err){
         res.status(400).send({error:err});
       }
});
router.get('/reserve/getClinic', async function(req, res, next) {
    console.log(req.query.clinicId);
    try{
     let response=await reserveController.getClinicReserve(req.query.clinicId);
     res.status(200).send({response:response});
    }
    catch(err){
      res.status(400).send({error:err});
    }
});
router.get('/reserve/getIndividualTotal', async function(req, res, next) {
    console.log(req.query.userId);
    try{
        let response=await reserveController.getIndividualTotal(req.query.userId);
        res.status(200).send({response:response});
    
    }
    catch(err){
        res.status(400).send({error:err});
    }
});

module.exports = router;