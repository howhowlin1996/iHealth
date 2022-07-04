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

async function cancelClinicReserve(userId,clinicId){
    console.log(userId,clinicId);
    try{
        let response=await reserve.cancelReserve(userId,clinicId);
       
        return response;
        
    }
    catch(err){
        return err;
       
    }
}

async function getUserReserveInClinic(userId,clinicId){
    console.log(userId,clinicId);
    try{
        let response=await reserve.getUserReserveInClinic(userId,clinicId);
       
        return response;
        
    }
    catch(err){
        return err;
       
    }


}

async function getWaiting(type,id){
    console.log(type,id);
    try{
        let response=await reserve.getWaiting(type,id);
       
        return response;
        
    }
    catch(err){
        return err;
       
    }


}
async function getRecord(id){
    console.log(id);
    try{
        let response=await reserve.getRecord(id);
        return response;
      
        
    }
    catch(err){
        return err;
       
    }


}




module.exports={
   insertClinicReserve,
   getClinicReserve,
   getIndividualTotal,
   cancelClinicReserve,
   getUserReserveInClinic,
   getWaiting,
   getRecord
}