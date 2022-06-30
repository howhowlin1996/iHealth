const medical=require('../models/getMedicalModel');



async function getClinicInform(data,type){
    console.log(type);
        if(type==='popular'){
           

           
        }
        else{
            try{
                console.log(data.lat,data.lng,type);
                let response=medical.getNearByClinic(data);
                return response;
                
            }
            catch(err){
                return error;
               
            }
        }
        return 'success';

}




module.exports={
   getClinicInform
}