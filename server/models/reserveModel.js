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

async function getUserReserveInClinic(userId,clinicId){
    let waitingReserve='SELECT 1 FROM clinicReserve WHERE userId=?&&clinicId=?&&valid=1&&reserveDay>=curdate();'
    try{
        let waiting=await db.query(waitingReserve,[userId,clinicId]);
        console.log(waiting[0]['1'],'here')
        return {num:waiting[0]['1']};
        

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
async function cancelReserve(userId,clinicId){
   
    let createSql='UPDATE clinicReserve SET valid=0 WHERE userID=? && clinicId=?';
    let waitingReserve='SELECT count(*) FROM clinicReserve WHERE clinicId=?&&valid=1&&reserveDay>=curdate();'
    try{
        await db.transaction('SET SQL_SAFE_UPDATES = 0;');
        await db.query(createSql,[userId,clinicId]);
        await db.transaction('SET SQL_SAFE_UPDATES = 1;');
        let waiting=await db.query(waitingReserve,[clinicId]);
        console.log(waiting[0]['count(*)']);
        return {num:waiting[0]['count(*)']};

    }
    catch(err){
        console.log(err);
    }
}

async function getWaiting(type,id){
   
    if(type==='clinic'){
        try{
            let waitingReserve='SELECT clinicReserve.*,userInform.name FROM clinicReserve,userInform WHERE clinicReserve.userId=userInform.id && clinicId=?&&valid=1&&reserveDay>=curdate();'
            let waiting=await db.query(waitingReserve,[id]);
            console.log(waiting);
            return waiting;
    
        }
        catch(err){
            console.log(err);
        }

    }
    else if(type==='patient'){
        try{
            let waitingReserve='SELECT clinicReserve.*,clinic.name FROM clinicReserve,clinic WHERE clinicReserve.clinicId=clinic.id && clinicReserve.userId=?&&clinicReserve.valid=1&&clinicReserve.reserveDay>=curdate();'
            let waiting=await db.query(waitingReserve,[id]);
            console.log(waiting);
            return waiting;
    
        }
        catch(err){
            console.log(err);
        }

    }
   
    
}
async function getRecord(id){
    let userIdSql='SELECT userId FROM clinicReserve WHERE id=?&&valid=1&&reserveDay>=curdate();'
    let recordSql='SELECT name,birthday,weight,height,gender,medicalHistory,allergy FROM userInform WHERE id=?;'
    try{
        let [userId]=await db.query(userIdSql,[id]);
         console.log(userId['userId']);
        let record=await db.query(recordSql,[userId['userId']]);
        return record;

    }
    catch(err){
        console.log(err);
    }
}

module.exports = {
    createReserve,
    getReserve,
    getIndividualTotal,
    cancelReserve,
    getUserReserveInClinic,
    getWaiting,
    getRecord
}