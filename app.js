const express = require("express");
const { engine } = require("express-handlebars");
const fs = require("fs");
const path = require("path");

const app = express();

/* -----------------------
 Handlebars configuration:
----------------------- */
app.engine(
  "handlebars",
  engine({
    extname: ".handlebars",
    defaultLayout: "main",
    partialsDir: path.join(__dirname, "views/partials"),
  }),
);
app.set("view engine", "handlebars");
app.set("views", "./views");

/* ----------------------------------------
 Serving CSS files in the public directory:
---------------------------------------- */
app.use(express.static("public"));

/* ----------
 the / route:
---------- */
app.get("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./data.json", "utf8"));
  res.render("content", data);
});

app.listen(3000, () => console.log("Resume running at http://localhost:3000"));
