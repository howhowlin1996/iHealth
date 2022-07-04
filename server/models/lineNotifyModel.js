const db = require('../../service/db.js'); 
var fetch=require('node-fetch');
var FormData = require('form-data');
let fs = require('fs');
async function insertNotifyToken(token,userId){
        console.log(token,userId);
        var insertSql='INSERT INTO accessToken(userId,lineAccess) values(?,?);'
        try {
            let response=await db.query(insertSql,[userId,token]);
            const formData = new FormData();
            //fs.createReadStream('public/images/medicine.jpeg');
            //formData.append('imageFile',fs.createReadStream('public/images/medicine.jpeg'));
            formData.append('stickerId','1988');
            formData.append('stickerPackageId','446');
            formData.append('message','iHealth 綁定成功');
           
            //console.log(token)
            let msg=await fetch(`https://notify-api.line.me/api/notify`, {
                body:formData,
                headers: new fetch.Headers({
                  
                  'Authorization':'Bearer '+token
                }),
                method: 'POST'
              }).then((response) => response.json())
                .then((data)=>{return data;})
            console.log(msg);
            
        }
        catch(err){
            console.log(err);
        }


}


async function sendNotify(userId,clinicId){
  
  var selectTokenSql='SELECT lineAccess from  accessToken where userId=?;'
  var selectClinicSql='SELECT name from  clinic where id=?;'
  try {
      let response=await db.query(selectTokenSql,[userId]);
      let name=await db.query(selectClinicSql,[clinicId]);
      console.log(response[0]['lineAccess']);
      console.log(name[0]['name']);
      let token=response[0]['lineAccess'];
      const formData = new FormData();
      //fs.createReadStream('public/images/medicine.jpeg');
      //formData.append('imageFile',fs.createReadStream('public/images/medicine.jpeg'));
      //formData.append('stickerId','1988');
      //formData.append('stickerPackageId','446');
      formData.append('message','您好: '+name[0]['name']+'提醒您即將輪到您看診');
     
      //console.log(token)
      let msg=await fetch(`https://notify-api.line.me/api/notify`, {
          body:formData,
          headers: new fetch.Headers({
            
            'Authorization':'Bearer '+token
          }),
          method: 'POST'
        }).then((response) => response.json())
          .then((data)=>{return data;})
      console.log(msg);
      
  }
  catch(err){
      console.log(err);
  }


}


module.exports = {
   insertNotifyToken,
   sendNotify
}