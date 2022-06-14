const express = require("express");
const mongoose = require("mongoose");
const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/courseRoute");
const categoryRoute = require("./routes/categoryRoute");
const ejs = require("ejs");
const app = express();
const port = 3000;

// connect db
mongoose
  .connect("mongodb://127.0.0.1/smartedu-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected Database");
  })
  .catch((err) => {
    console.log(err);
  });

//Template Engine
app.set("view engine", "ejs");

//Middlewares
app.use(express.static("public"));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//Routes

app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);

app.listen(port, () => {
  console.log(`Sunucu ${port} portu ile başlatıldı`);
});
