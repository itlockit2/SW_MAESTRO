import express from "express";
import { join } from "path";
import socketIO from "socket.io";

const PORT = 4000;
const app = express();

app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(express.static(join(__dirname, "static")));
app.get("/", (req, res) => res.render("home"));
const handleListening = () => {
  console.log(`server running http://localost:${PORT}`);
};
app.listen(PORT, handleListening);