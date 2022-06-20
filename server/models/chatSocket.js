//import express 和 ws 套件
const express = require('express')
const SocketServer = require('ws').Server
const SocketIdGroup=[];
const clientGroup=[];
const PORT = 8080 //指定 port

//創建 express 物件，綁定監聽  port , 設定開啟後在 console 中提示
const server = express().listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})
//將 express 交給 SocketServer 開啟 WebSocket 的服務
const wss = new SocketServer({ server })
//當有 client 連線成功時
wss.on('connection',  (ws,req) => {
    console.log('Client connected')
    let id=parseInt(req.url.replace("/?token=",""));
    let socketPos=SocketIdGroup.indexOf(id);
    //console.log(socketPos);
    if(socketPos===-1){
        let client=[];
        client.push(ws);
        clientGroup.push(client);
        //console.log(clientGroup,"hahaha");
        SocketIdGroup.push(id);
        socketPos=clientGroup.length-1;
    }
    else{
        
        clientGroup[socketPos].push(ws);
    }
  // 當收到client消息時
  ws.on('message', data => {

    data = data.toString()  
    //console.log(msg['type']);
    //ws.send(data);
    console.log(data)
    ws.send(data)

    clientGroup[socketPos].forEach(client => {
      //console.log(clientGroup[socketPos].length);
      //console.log(ws,client)
      if(client!=ws)client.send(data)  // 發送至每個 client
    })
    
    
  })

  // 當連線關閉
  ws.on('close', () => {
    let id=clientGroup[socketPos].indexOf(ws);
    clientGroup[socketPos].splice(id,1);
    console.log('Close connected')
  })
})
