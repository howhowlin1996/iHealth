const reserve=require('../models/reserveModel');




async function insertClinicReserve(userId,clinicId){
    console.log(userId,clinicId);
    try{
        let response=await reserve.createReserve(userId,clinicId);
       
        return response;
        
    }
    catch(err){
        return err;
       
    }


}

async function getClinicReserve(clinicId){
    console.log(clinicId);
    try{
        let response=await reserve.getReserve(clinicId);
       
        return response;
        
    }
    catch(err){
        return err;
       
    }

}

async function getIndividualTotal(userId){
    console.log(userId);
    try{
        let response=await reserve.getIndividualTotal(userId);
        
        return response;
    }
    catch(err){
        return err;
       
    }

}





module.exports={
   insertClinicReserve,
   getClinicReserve,
   getIndividualTotal
}