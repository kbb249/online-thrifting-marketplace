import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import socketIo from "socket.io"; //imports socket.io chat features

dotenv.config();
const app = express();
app.use(express.json());
//run server on local
const PORT = 3000;

//server for socket connections
const server = createServer(app);
//attach socket.io to the server
const io = socketIo(server);

//lists connected users so they can message
let connectedUsers= [];

// Setup path for frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//render ejs 
app.get("/", (req, res) => {
  res.render("linku-index"); // do NOT include .ejs
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

//socket chat functionality
io.on('connection', (socket) => {
  //displays message
  socket.on('chat message', (msg) => {
    //currently shows messages to all
    console.log('message received:', msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    //logs when users disconnect from the server
    console.log('user disconnected');
    //removes connected users from list
    connectedUsers = connectedUsers.filter(item => item.socketId != socket.id);
  });
});
