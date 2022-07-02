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


module.exports = {
   insertNotifyToken
}