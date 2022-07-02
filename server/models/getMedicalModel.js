const db = require('../../service/db.js'); 


// create new member information into database 
async function getNearByClinic(data){
    let getNearBySql=`select id,ST_Distance_Sphere(position,point(?,?)) as distance,name,clinicType,medicalType,phoneNumber,address,image from clinic where medicalType like '%西醫%'&&member=1 order by distance limit 5;`;
    console.log(data.lat,data.lng)
    try{
        let response=await db.query(getNearBySql,[data.lng,data.lat]);
        return response;
    }
    catch(err){
        console.log(err);
    }

    
}
async function getPopularClinic(){
    let getPopularSql=`select id,name,clinicType,medicalType,phoneNumber,address,image from clinic where medicalType like '%西醫%'&&member=1 order by clickTime limit 5;`;

    try{
        let response=await db.query(getPopularSql,[]);
        console.log(response,'here');
        return response;
    }
    catch(err){
        console.log(err);
    }

    
}

async function getDrugStore(data){
    let getDrugStoreSql=`select id,ST_Distance_Sphere(position,point(?,?)) as distance,name,address,phoneNumber,insurance from drugStore  where member=1 order by distance limit 5;`;
    console.log(data.lat,data.lng)
    try{
        let response=await db.query(getDrugStoreSql,[data.lng,data.lat]);
        return response;
    }
    catch(err){
        console.log(err);
    }

    
}

async function getIndividual(id,type){
  let getIndividualSql;
  if(type==='clinic'){
        getIndividualSql='select id,name,clinicType,medicalType,phoneNumber,address,image from clinic where id=? '
  }
  else{
      getIndividualSql='select id,name,address,phoneNumber,insurance from drugStore  where id=?'
  }
  try{
    let response=await db.query(getIndividualSql,[id]);
    return response;
    }
    catch(err){
        console.log(err);
    }

    
}


module.exports = {
    getNearByClinic,
    getPopularClinic,
    getDrugStore,
    getIndividual
}