const db = require('../../service/db.js'); 
const crypto=require('crypto');
const path = require('path');
require('dotenv').config({path:path.resolve(__dirname, '../.env')}); // need to use .env file for private key in HMAC

// create new member information into database 
async function createMember(data){
    var cryptPassword=hashPassword(data.password,data.email);// use encryption
    //get the detail information from post
    let name=data.name;
    let email=data.email;
    let birthday=data.birthday;
    let gender=data.gender;
    let address=data.address;
    let height=data.height;
    let weight=data.weight;
    let medicalHistory=data.medicalHistory;
    let allergy=data.allergy;
    console.log(name,email,birthday,gender,address,height,weight,medicalHistory,allergy,cryptPassword);

    const checkEmail=await db.query("SELECT 1 FROM userInform WHERE email = ?",[email]);//check if email is used
    if(checkEmail.length!=0) throw new Error("dupicate email "+email);
    
    let createSql='INSERT INTO userInform(name,email,password,birthday,weight,height,gender,medicalHistory,allergy) values(?,?,?,?,?,?,?,?,?);';
    try{
        await db.query(createSql,[name,email,cryptPassword,birthday,weight,height,gender,medicalHistory,allergy]);
    }
    catch(err){
        console.log(err);
    }
}

function hashPassword(password,email) {  //use HMAC+SALT to do the encryption
    const secret=process.env.Secret;     // to get the secret key for HMAC
    const hash = crypto.createHmac('sha256', secret).update(password+email).digest('hex');
    return hash; 
}

module.exports = {
    createMember
}