const medical=require('../models/getMedicalModel');



async function getClinicInform(data,type){
    console.log(type);
        if(type==='popular'){
            try{
                
                let response=await medical.getPopularClinic();
                return response;
                
            }
            catch(err){
                return error;
               
            }
           
        }
        else if(type==='nearby'){
            try{
                //console.log(data.lat,data.lng,type);
                let response= await medical.getNearByClinic(data);
                console.log(response);
                return response;
                
            }
            catch(err){
                return error;
               
            }
        }
        else {
            try{
                console.log(data.lat,data.lng,type);
                let response= await medical.getDrugStore(data);
                console.log(response);
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