var express = require('express');
var router = express.Router();
var lineNotifyController=require('../controller/lineNotifyController')

/* GET home page. */
router.post('/notify/accessToken', async function(req, res, next) {
        let status= await lineNotifyController.accessLineNotify(req.body,req.id);
        if(status===0){
            res.status(200).send({msg:'順利綁定，請檢查line將Line Notify 加入群組'});
        }
        else{
            res.status(200).send({msg: '請檢查line帳號是否錯誤或已綁定'});
        }
        
});

router.post('/notify/send', async function(req, res, next) {
    let status= await lineNotifyController.sendNotify(req.query.userId,req.query.clinicId);
    if(status===0){
        res.status(200).send({msg:'傳送成功'});
    }
    else{
        res.status(200).send({msg: '傳送失敗'});
    }
    
});

module.exports = router;