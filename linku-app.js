import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());
//run server on local
const PORT = 3000;


// Setup path for frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));
//sets up ejs engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//render files
app.get("/", (req, res) => {
  res.render("linku-home");
});
app.get("/catalog", (req, res) => {
  res.render("linku-catalog");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
