var express = require('express');
const SocketServer = require('ws').Server;
const SocketIdGroup=[];
const clientGroup=[];
//const URLSearchParams = require('url').URLSearchParams;

const PORT = process.env.VideoChatPort //指定 port

//創建 express 物件，綁定監聽  port , 設定開啟後在 console 中提示
const server = express().listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})
//將 express 交給 SocketServer 開啟 WebSocket 的服務
const wss = new SocketServer({ server })
//當有 client 連線成功時
wss.on('connection', (ws,req) => {
  //console.log( wss.clients);
  // 當收到client消息時
  //console.log(req.url.replace("/?token=",""));
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

  //ws.send("連線成功"+id+"\n"+"在線人數: "+clientGroup[socketPos].length);
  ws.on('message', data => {
    data = data.toString()  
    //let msg=JSON.parse(data);
    //console.log(msg['type']);
    //ws.send(msg["txt"]);

    clientGroup[socketPos].forEach(client => {
      //console.log(data);
      if(client!=ws)client.send(data)  // 發送至每個 client
    })
    
    
  })
  ws.on('close', () => {
    clientGroup[socketPos].forEach(client => {
       let data={'state':'end'}
      if(client!=ws)client.send(JSON.stringify(data))  // 發送至每個 client
    })
    let id=clientGroup[socketPos].indexOf(ws);
    clientGroup[socketPos].splice(id,1);
    console.log(clientGroup[socketPos].length);
    console.log('Close connected')
    
    
  })
  
})