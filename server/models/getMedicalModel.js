const db = require('../../service/db.js'); 


// create new member information into database 
async function getNearByClinic(data){
    let getNearBySql=`select ST_Distance_Sphere(position,point(?,?)) as distance,name,clinicType,medicalType,phoneNumber,address from clinic where medicalType like '%西醫%'&&member=1 order by distance limit 5;`;
    console.log(data.lat,data.lng)
    try{
        let response=await db.query(getNearBySql,[data.lng,data.lat]);
        return response;
    }
    catch(err){
        console.log(err);
    }

    
}


module.exports = {
    getNearByClinic
}