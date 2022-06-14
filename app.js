const express = require("express");
const ejs = require("ejs");
const app = express();
const port = 3000;

//Template Engine
app.set("view engine", "ejs");

//Middlewares
app.use(express.static("public"));

//Routes

app.get("/", (req, res) => {
  res.status(200).render("index",{
    pageName:'index'
  });
});

app.get("/about", (req, res) => {
    res.status(200).render("about",{
        pageName:'about'
    });
  });
app.listen(port, () => {
  console.log(`Sunucu ${port} portu ile başlatıldı`);
});
