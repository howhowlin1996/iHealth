let localstream;
let videoTrack;
let audioTrack;
const myVideo = document.querySelector('#myVideo');
const endCall = document.querySelector('.endCall');
const remoteVideo = document.querySelector('#remoteVideo');
const initialBtn = document.querySelector('.initialBtn');
const btnCall = document.querySelector('.btnCall');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let offer;
let pc;
let url = 'ws://localhost:3001?token='+urlParams.get("token");
var ws = new WebSocket(url)
ws.onopen = () => {
  console.log('open connection')
}

ws.onclose = () => {
  console.log('close connection');
}







const signalOption = {
  offerToReceiveAudio: 1, // 是否傳送聲音流給對方
  offerToReceiveVideo: 1, // 是否傳送影像流給對方
};
const constraints = {
  audio: true,
  video: { width: 1280, height: 720 }
};

function createPeerConnection() {
  const configuration = {
    iceServers: [{
      urls: 'stun:stun.l.google.com:19302' // Google's public STUN server
    }]
   };
  pc = new RTCPeerConnection(configuration);
  //console.log(pc);
};





// 初始化影像/聲音
async function createMedia() {
  // 儲存本地流到全域
  localstream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
  //console.log(localstream);
  myVideo.srcObject = localstream;
  getAudioVideo();
  
};

// 取得裝置名稱
function getAudioVideo() {
  //console.log(localstream);
  const video = localstream.getVideoTracks();
  const audio = localstream.getAudioTracks();

  if (video.length > 0) {
    //console.log(`使用影像裝置 => ${video[0].label}`)
  };
  if (audio.length > 0) {
    //console.log(`使用聲音裝置 => ${audio[0].label}`)
  };
}
// 增加本地流
function addLocalStream() {
  pc.addStream(localstream)
};





// 監聽 ICE Server
function onIceCandidates() {
  // 找尋到 ICE 候選位置後，送去 Server 與另一位配對
  pc.onicecandidate = ({ candidate }) => {
    if (!candidate) { return; }
    console.log('onIceCandidate => ', { candidate });
    var msg = {
      type: 'candidateNum',
      value:  candidate ,
      date: Date.now()
    };
    ws.send(JSON.stringify(msg));
    document.querySelector('#remoteVideo').style.backgroundImage="url('loading.gif')";
  };
};

// 監聽 ICE 連接狀態
function onIceconnectionStateChange() {
  console.log('ICE 伺服器狀態變更 => ', pc.iceConnectionState);
  pc.oniceconnectionstatechange = (evt) => {
    console.log('ICE 伺服器狀態變更 => ', evt.target.iceConnectionState);
    console.log(typeof evt.target.iceConnectionState);
    if(evt.target.iceConnectionState==='disconnected')remoteVideo.srcObject=null;

  };
}

// 監聽是否有流傳入，如果有的話就顯示影像
function onAddStream() {
  pc.onaddstream = (event) => {
    console.log(remoteVideo.srcObject);
    if(event.stream){
      document.querySelector('#remoteVideo').style.backgroundImage=null;
      remoteVideo.srcObject = event.stream;
      console.log('接收流並顯示於遠端視訊！', event);
      
    }
  }
}

function sendSignalingMessage(desc, offer) {
  const isOffer = offer ? "offer" : "answer";
  //console.log(`寄出 ${isOffer}`);
  var msg = {
    type: 'descNum',
    value:  desc,
    date: Date.now()
  };
  ws.send(JSON.stringify(msg));
  //ws.emit("peerconnectSignaling", { desc });
};

//接收 Server 發送的訊息

ws.onmessage = async event => {
  //console.log(event);
  let msg = JSON.parse(event.data);
  let type=msg["type"];
  let value=msg["value"];
  let state=msg['state'];
  if(state==='end') {
    remoteVideo.srcObject=null;
  }
  if (type=='descNum' && value.type!=pc.currentRemoteDescription) {
    //console.log('desc => ', value);
    await pc.setRemoteDescription(new RTCSessionDescription(value));
    createSignal(value.type === 'answer' ? true : false);
  } else if (value) {
    // 新增對方 IP 候選位置
    //console.log('candidate =>', value);
    pc.addIceCandidate(new RTCIceCandidate(value));
  }
}

async function createSignal(isOffer) {
  try {
    if (!pc) {
      console.log('尚未開啟視訊');
      return;
    }
    // 呼叫 peerConnect 內的 createOffer / createAnswer
    offer = await pc[`create${isOffer ? 'Offer' : 'Answer'}`](signalOption);

    // 設定本地流配置
    await pc.setLocalDescription(offer);
    sendSignalingMessage(pc.localDescription, isOffer ? true : false)
  } catch(err) {
    console.log(err);
  }
};

function initPeerConnection() {
  if(ws.readyState===3) ws = new WebSocket(url)
  ws.onopen = () => {
    console.log('open connection')
  }
  createMedia();

  
  
}

function call(){
  createPeerConnection();
  addLocalStream();
  onIceCandidates();
  onIceconnectionStateChange();
  onAddStream();
  createSignal(true);
 
}

function hangUp(){
  ws.close(); 
  localstream.getTracks().forEach(function(track) {
    if (track.readyState == 'live') {
        track.stop();
    }
  });
  remoteVideo.srcObject=null;
  myVideo.srcObject =null;
  pc.close();


}

initialBtn.addEventListener('click', initPeerConnection);
btnCall.addEventListener('click', call);
endCall.addEventListener('click', hangUp);