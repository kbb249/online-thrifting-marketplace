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

// Setup path for frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));
//sets up ejs engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//render files
app.get("/", (req, res) => 
{
  res.render("linku-home");
});
app.get("/catalog", (req, res) => 
{
  res.render("linku-catalog");
});

app.get("/signup", (req, res) => 
{
  res.render("linku-signup");
});

app.get("/signin", (req, res) => 
{
  res.render("linku-signin");
})

app.get("/submit_report", (req, res) => 
{
  res.render("linku-submit-report");
})

app.get("/report_log", (req, res) =>
{
  const posts = getAllReports();
  res.render("linku-reportlog", {posts});
})

function signinRedirect()
{
  window.location.href = '/linku-signup.ejs';
}

app.post("/submit_report", (req, res) =>
{
  const newReportData = req.body;
  createReport(newReportData);
  res.redirect('/')
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

