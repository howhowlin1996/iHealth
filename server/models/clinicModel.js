const db = require('../../service/db.js'); 
const crypto=require('crypto');
const path = require('path');
require('dotenv').config({path:path.resolve(__dirname, '../.env')}); // need to use .env file for private key in HMAC
const jwt = require('jsonwebtoken');
const {TokenExpire,TokenSecret} = process.env;

// create new member information into database 
async function createMember(data){
    var cryptPassword=hashPassword(data.password,data.email);// use encryption
    //get the detail information from post
    console.log(cryptPassword);
    let email=data.email;
    let clinicId=data.clinicId;
    
    //console.log(name,email,birthday,gender,address,height,weight,medicalHistory,allergy,cryptPassword);

    const checkEmail=await db.query("SELECT 1 FROM clinicMember WHERE email = ?",[email]);//check if email is used
    if(checkEmail.length!=0) throw new Error("email被註冊過了喔 "+email);
    const checkClinicId=await db.query("SELECT 1 FROM clinic WHERE id = ?",[clinicId]);//check if email is used
    if(checkClinicId.length==0) throw new Error("錯誤診所編號 "+clinicId);
    
    let createSql='INSERT INTO clinicMember(clinicId,email,password) values(?,?,?);';
    try{
        await db.query(createSql,[clinicId,email,cryptPassword]);
    }
    catch(err){
        console.log(err);
    }
}

const nativeSignIn = async (email, password,remember) => {
    let user={}
    try {
        //console.log(email,password,remember);
        await db.transaction('START TRANSACTION');

        const [users] = await db.query('SELECT * FROM clinicMember WHERE email = ?', [email]);
        const [clinic] = await db.query('SELECT * FROM clinic WHERE id = ?', [users['clinicId']]);
        console.log(clinic);
       

        if (hashPassword(password,email)!=users['password']){
            await db.query('COMMIT');
            return {error: 'Password is wrong'};
        }

        const loginAt = new Date();
        const accessToken = jwt.sign({
            identity:'doctor',
            id:users['id'],
            clinicId: users['clinicId'],
            email: users['email'],
            clinicName:clinic['name']

        }, TokenSecret);
        user.access_token = accessToken;
        user.login_at = loginAt;
        if(remember===true)user.access_expired = TokenExpire;
        else user.access_expired=86400;

        return {user};
    } catch (error) {
        await db.transaction('ROLLBACK');
        return {error};
    } 
};

function hashPassword(password,email) {  //use HMAC+SALT to do the encryption
    const secret=process.env.Secret;     // to get the secret key for HMAC
    const hash = crypto.createHmac('sha256', secret).update(password+email).digest('hex');
    return hash; 
}

module.exports = {
    createMember,
    nativeSignIn
}