var fetch = require('node-fetch');
const iconv = require('iconv-lite');
const db = require('../../service/db.js'); 


var data,inform=[];

async function getClinic(){
  var createQuery ='CREATE TABLE IF NOT EXISTS clinic(id BIGINT NOT NULL, name VARCHAR(50), clinicType VARCHAR(50), medicalType VARCHAR(50),location VARCHAR(50),phoneNumber VARCHAR(50), address VARCHAR(100), position POINT, member Boolean,clickTime BIGINT,createDate DATE,PRIMARY KEY(id))'
  await db.query(createQuery);
    await fetch('https://www.mohw.gov.tw/dl-74950-a5d068de-760e-4e48-868f-3e247ca1ba02.html')
      .then(res => res.arrayBuffer())
      .then(arrayBuffer => iconv.decode(Buffer.from(arrayBuffer), 'big5'))
      .then(converted => data=converted.split('\r\n'))
   
    for(var i=1;i<data.length;i++){
        let pos;
        if(data[i].split(',').length<7) continue;
        const clinicInform=data[i].split(',').slice(0,7);
        if(!(clinicInform[4].includes('台北市')||clinicInform[4].includes('新北市')||clinicInform[4].includes('臺北市')))continue;
        let cleanIndex=clinicInform[6].indexOf('及');
        if(cleanIndex!==-1) clinicInform[6]=clinicInform[6].substring(0,cleanIndex);
        cleanIndex=clinicInform[6].indexOf('、');
        if(cleanIndex!==-1) clinicInform[6]=clinicInform[6].substring(0,cleanIndex);
        
        
        await fetch('https://geocode.search.hereapi.com/v1/geocode?q='+clinicInform[6]+'&apiKey=U6_f3OFUMdewMkLFrZ4k-Hc2CMp9O5n6WrnEz2oytb0')
        .then(res=>res.json())
        .then(data=>{if(data['items'].length>0)pos=data['items'][0]['position']})
        
        //pos=data['items'][0]['position']
        if(pos!==undefined)clinicInform.push(pos);
        else clinicInform.push({'lng':0,'lat':0})
        //console.log(clinicInform);
        insertDb(clinicInform)
        //inform.push(clinicInform);
        //console.log(inform[i-1][7]['lat'],inform[i-1][7]['lng']);
        //if(clinicInform[4].includes('台北市')||clinicInform[4].includes('新北市')||clinicInform[4].includes('臺北市'))inform.push(clinicInform);
        
    }
   
    //console.log(inform);
}





async function insertDb(inform){
  
  
  let insertQuery='INSERT INTO clinic(id,name,clinicType,medicalType,location,phoneNumber,address,position,member,clickTime,createDate) VALUES (?,?,?,?,?,?,?,POINT(?,?),?,?,NOW())';
  //console.log(inform[i][7]['lat'],inform[i][7]['lng']);
  try{

    await db.query(insertQuery,[parseInt(inform[0]),inform[1],inform[2],inform[3],inform[4],inform[5],inform[6],inform[7]['lng'],inform[7]['lat'],Math.random()*1,Math.random()*1000])
    console.log(inform[0],inform[1]);
  }
  catch(err){
  console.log(err);
  }
     
}

getClinic(); 