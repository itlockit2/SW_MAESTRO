import express from "express";
import { join } from "path";
import socketIO from "socket.io";
import logger from "morgan";

const PORT = 4000;
const app = express();

app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(express.static(join(__dirname, "static")));
app.use(logger("dev"));
app.get("/", (req, res) => res.render("home"));
const handleListening = () => {
  console.log(`server running http://localost:${PORT}`);
};
const server = app.listen(PORT, handleListening);
// grep server socketIO
const io = socketIO.listen(server);

io.on("connection", socket => {
  socket.on("newMessage", ({ message }) => {
    console.log(message);
    socket.broadcast.emit("messageNotification", {
      message,
      nickname: socket.nickname || "Anonnymous"
    });
  });
  socket.on("setNickname", ({ nickname }) => {
    socket.nickname = nickname;
  });
});
