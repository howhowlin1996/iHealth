const lineNotify=require('../models/lineNotifyModel');
var fetch = require('node-fetch');
var FormData = require('form-data');
async function accessLineNotify(data){
    //console.log(data,data.code,data.id)
    let lineBody={
        grant_type:'authorization_code',
        code:data.code,
        client_id:'LwQ8Kp1qb0y4iaw5pM7xOH',
        client_secret:'jPhlIAzmnv1uvxSLQjvKcebC4OTgz1w2di3s7FejVvn',

    }
    let code=await fetch(`https://notify-bot.line.me/oauth/token?grant_type=authorization_code&&client_id=LwQ8Kp1qb0y4iaw5pM7xOH&&client_secret=jPhlIAzmnv1uvxSLQjvKcebC4OTgz1w2di3s7FejVvn&&redirect_uri=http://localhost:3000/memberInform&&code=`+data.code, {
     
        headers: new fetch.Headers({
          'Content-Type': 'application/json',
        }),
        method: 'POST'
      }).then((response) => response.json())
        .then((data)=>{return data;})
    if(code['status']===200){
        console.log(code['status'],code)
        lineNotify.insertNotifyToken(code['access_token'],data.id);
        return 0;
       
    }
    else{

        return -1;
       
    }
    


    
    
}




module.exports={
   accessLineNotify
}