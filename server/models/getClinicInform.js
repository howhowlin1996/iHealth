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
        
        if(!(clinicInform[3].includes('西醫'))||!(clinicInform[4].includes('台北市')||clinicInform[4].includes('新北市')||clinicInform[4].includes('臺北市')))continue;
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
        insertClinicDb(clinicInform)
        //inform.push(clinicInform);
        //console.log(inform[i-1][7]['lat'],inform[i-1][7]['lng']);
        //if(clinicInform[4].includes('台北市')||clinicInform[4].includes('新北市')||clinicInform[4].includes('臺北市'))inform.push(clinicInform);
        
    }
   
    //console.log(inform);
}

async function getDrugStore(){
  var inform;
  var createQuery ='CREATE TABLE IF NOT EXISTS drugStore(id BIGINT NOT NULL  AUTO_INCREMENT, name VARCHAR(50) ,location VARCHAR(50),phoneNumber VARCHAR(50), address VARCHAR(100), position POINT, member Boolean,clickTime BIGINT,createDate DATE,insurance BOOLEAN NOT NULL,PRIMARY KEY(id),UNIQUE(address))'
  await db.query(createQuery);
    await fetch('https://data.fda.gov.tw/opendata/exportDataList.do?method=ExportData&InfoId=35&logType=5')
      .then(res => res.json())
      .then(data=>inform=data)
      
   
    for(var i=1;i<inform.length;i++){
        let pos;
        let city=inform[i]['地址縣市別'];
        let address=inform[i]['地址縣市別']+inform[i]['地址鄉鎮市區']+inform[i]['地址街道巷弄號'];
        //console.log(inform);
        if(!(city.includes('台北市')||city.includes('新北市')||city.includes('臺北市')))continue;
        let cleanIndex=address.indexOf('及');
        if(cleanIndex!==-1) address=address.substring(0,cleanIndex);
        cleanIndex=address.indexOf('、');
        if(cleanIndex!==-1) address=address.substring(0,cleanIndex);
        cleanIndex=address.indexOf('(');
        if(cleanIndex!==-1) address=address.substring(0,cleanIndex);
        //console.log(address)
        
        
        await fetch('https://geocode.search.hereapi.com/v1/geocode?q='+address+'&apiKey=U6_f3OFUMdewMkLFrZ4k-Hc2CMp9O5n6WrnEz2oytb0')
        .then(res=>res.json())
        .then(data=>{if(data['items'].length>0)pos=data['items'][0]['position']})
        //console.log(pos);
       
        if(pos!==undefined)inform[i]['position']=pos;
        else inform[i]['position']={'lng':0,'lat':0};
        insertDrugStore(inform[i]);
        //console.log(inform[i]);
        //console.log(clinicInform);
        //insertDb(clinicInform)
        //inform.push(clinicInform);
        //console.log(inform[i-1][7]['lat'],inform[i-1][7]['lng']);
        //if(clinicInform[4].includes('台北市')||clinicInform[4].includes('新北市')||clinicInform[4].includes('臺北市'))inform.push(clinicInform);
        
    }
   
    //console.log(inform);
}








async function insertClinicDb(inform){
  let insertQuery='INSERT INTO clinic(id,name,clinicType,medicalType,location,phoneNumber,address,position,member,clickTime,createDate) VALUES (?,?,?,?,?,?,?,POINT(?,?),?,?,NOW())';
  //console.log(inform[i][7]['lat'],inform[i][7]['lng']);
  try{

    await db.query(insertQuery,[parseInt(inform[0]),inform[1],inform[2],inform[3],inform[4],inform[5],inform[6],inform[7]['lng'],inform[7]['lat'],Math.random()*1,Math.random()*1000])
    //console.log(inform[0],inform[1]);
  }
  catch(err){
  console.log(err);
  }
     
}

async function insertDrugStore(inform){
  let insertQuery='INSERT INTO drugStore(name,location,phoneNumber, address, position, member,clickTime,createDate,insurance) VALUES(?,?,?,?,POINT(?,?),?,?,NOW(),?)';
  let name=inform['機構名稱'];
  let phoneNumber=inform['電話'];
  let address=inform['地址縣市別']+inform['地址鄉鎮市區']+inform['地址街道巷弄號'];
  let valid=inform['機構狀態']==='開業'?1:0;
  let insurance=inform['是否為健保特約藥局']==='Y'? 1:0;
  let location=inform['地址縣市別'];
  let position=inform['position']
  
  
  if(valid!==1)return;
  try{

    await db.query(insertQuery,[name,location,phoneNumber,address,position['lng'],position['lat'], Math.random()*1,Math.random()*1000,insurance])
   
  }
  catch(err){
    console.log(err); 
  }


}



module.exports={
  getClinic,getDrugStore

}
