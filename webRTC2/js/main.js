"use strict";

let isChannelReady = false;
let isInitiator = false;
let isStarted = false;
let localStream;
let pc;
let remoteStream;
let turnReady;
let room = null;

const pcConfig = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302"
    }
  ]
};

const sdpConstraints = {
  offerToReceiveAudio: true,
  offerToReceiveVideo: true
};

const socket = io.connect();

if (room != "" || room === null) {
  room = prompt("enter room name");
  socket.emit("createOrJoinRoom", room);
  console.log("createOrJoinRoom ", room);
}

socket.on("log", array => {
  console.log(array);
});

socket.on("created", room => {
  console.log(`${room} 방을 만들었습니다.`);
  isInitiator = true;
});
