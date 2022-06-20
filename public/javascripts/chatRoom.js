const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
document.addEventListener("DOMContentLoaded", event => { 
    let keyinDom = document.querySelector('#txtInput')
    let showDom = document.querySelector('#txtShow')
  
    document.querySelector("#btnSend").addEventListener('click',() => {
      let txt = keyinDom.value;
      ws.send(txt);
      keyinDom.value=""
    })
  
    let url = 'ws://localhost:8080?token='+urlParams.get("token");
    var ws = new WebSocket(url)
    // 監聽連線狀態
    ws.onopen = () => {
      console.log('open connection')
    }
    ws.onclose = () => {
      console.log('close connection');
    }
    //接收 Server 發送的訊息
    ws.onmessage = event => {
      let txt = event.data
      console.log(txt)
      if (!showDom.value) showDom.value = txt
      else showDom.value = showDom.value + "\n" + txt
      keyinDom.value = ""
    }
  });