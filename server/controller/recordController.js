const medical=require('../models/recordModel');




async function insertRecord(record,id){
    console.log(record,id);
    try{
        let response= await medical.insertRecord(record,parseInt(id));
        console.log(response);
        return response;
        
    }
    catch(err){
        return err;
       
    }


}

async function getRecord(id){
    console.log(id);
    try{
        let response= await medical.getRecord(id);
        console.log(response);
        return response;
        
    }
    catch(err){
        return err;
       
    }


}




module.exports={
  insertRecord,
  getRecord
}