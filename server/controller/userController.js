const patient=require('../models/patientModel');



async function signUpController(data,type){
    console.log(type);
        if(type==='patient'){
            try{
                console.log(type);
                await patient.createMember(data);
            }
            catch(err){
                console.log(err.message);
                return err.message;
            }

           
        }
        return 'success';

}

async function signInController(data,type){
    //console.log(type);
    let inform;
        if(type==='patient'){
            try{
                console.log(type);
                inform=await patient.nativeSignIn(data.email,data.password,data.remember);
            }
            catch(err){
                console.log(err.message);
                return err.message;
            }

           
        }
        console.log(inform);
        return inform;

}


module.exports={
    signUpController,
    signInController
}