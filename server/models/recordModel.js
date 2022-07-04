const db = require('../../service/db.js'); 
var fetch=require('node-fetch');
var FormData = require('form-data');
let fs = require('fs');
async function insertRecord(record,id){
        console.log(record,id);
        var updateSql='UPDATE clinicReserve SET record=?,valid=0 where id=?';
        var selectToken='SELECT accessToken.lineAccess from accessToken,clinicReserve where clinicReserve.id=?&&clinicReserve.userId=accessToken.userID;'
        try {
            let response=await db.query(updateSql,[JSON.stringify(record),id]);
            let accessToken=await db.query(selectToken,[id]);
            console.log(accessToken[0]['lineAccess']);
            const formData = new FormData();
            formData.append('stickerId','1988');
            formData.append('stickerPackageId','446');
            formData.append('message','處方簽請點連結:https://18.236.9.61/individualRecord?id='+id);
           
            //console.log(token)
            let msg=await fetch(`https://notify-api.line.me/api/notify`, {
                body:formData,
                headers: new fetch.Headers({
                  'Authorization':'Bearer '+accessToken[0]['lineAccess']
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
async function getRecord(id){
  console.log(id);
  var selectRecord='SELECT record from clinicReserve where id=?;'
  try {
      let response=await db.query(selectRecord,[id]);
      return response[0]['record'];
     
     
      
  }
  catch(err){
      console.log(err);
  }


}

module.exports = {
  insertRecord,
  getRecord
}