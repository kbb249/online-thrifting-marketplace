import express from "express";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
app.use(express.json());
//run server on local
const PORT = 3000;


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
