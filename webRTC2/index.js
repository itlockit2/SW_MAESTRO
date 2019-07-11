const os = require("os");
const nodeStatic = require("node-static");
const http = require("http");
const socketIO = require("socket.io");

const fileServer = new nodeStatic.Server();
const app = http
  .createServer((req, res) => {
    fileServer.serve(req, res);
  })
  .listen(8080);

const io = socketIO.listen(app);
io.sockets.on("connection", socket => {
  function log(msg) {
    var array = ["Message from server :"];
    array.push(msg);
    socket.emit("log", array);
  }
  socket.on("createRoom", room => {
    // room 안에 있는 클라이언트 들을 구해온다.
    const clientsInRoom = io.sockets.adapter.rooms[room];
    // 클라이언트 수를 구한다.
    const numClients = clientsInRoom
      ? Object.keys(clientsInRoom.sockets.length)
      : 0;
    log(`Room ${room} 안에 현재 ${numClients} 명의 클라이언트가 있습니다.`);
    // 만약 최초 생성자라면
    if (numClients === 0) {
      socket.join(room);
      log(`${socket.id}가 ${room} 방을 만들었습니다.`);
      socket.emit("created", room, socket.id);
    } else {
      log(`${socket.id}가 방에 들어왔습니다.`);
    }
  });
});
