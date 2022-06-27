const signUp=require('../models/signUpPatient');



async function signUpController(data,type){
    console.log(type);
        if(type==='patient'){
            try{
                console.log(type);
                await signUp.createMember(data);
            }
            catch(err){
                console.log(err.message);
                return err.message;
            }

           
        }
        return 'success';

}


module.exports={
    signUpController
}