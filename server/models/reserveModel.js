const db = require('../../service/db.js'); 


// create new member information into database 
async function createReserve(userId,clinicId){
   
    let createSql='INSERT INTO clinicReserve(userId,clinicId,reserveDay,valid) values(?,?,NOW(),1);';
    let waitingReserve='SELECT count(*) FROM clinicReserve WHERE clinicId=?&&valid=1&&reserveDay>=curdate();'
    try{
        await db.query(createSql,[userId,clinicId]);
        let waiting=await db.query(waitingReserve,[clinicId]);
        return {num:waiting[0]['count(*)']};

    }
    catch(err){
        console.log(err);
    }
}

async function getReserve(clinicId){
    let waitingReserve='SELECT count(*) FROM clinicReserve WHERE clinicId=?&&valid=1&&reserveDay>=curdate();'
    try{
        let waiting=await db.query(waitingReserve,[clinicId]);
        return {num:waiting[0]['count(*)']};

    }
    catch(err){
        console.log(err);
    }
}

async function getIndividualTotal(userId){
    let waitingReserve='SELECT count(*) FROM clinicReserve WHERE userId=?&&valid=1&&reserveDay>=curdate();'
    try{
        let waiting=await db.query(waitingReserve,[userId]);
        console.log(waiting)
        return {num:waiting[0]['count(*)']};

    }
    catch(err){
        console.log(err);
    }
}


module.exports = {
    createReserve,
    getReserve,
    getIndividualTotal
}