const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const fileUpload = require('express-fileupload');
const pageRoute = require("./routes/pageRoute");
const courseRoute = require("./routes/courseRoute");
const categoryRoute = require("./routes/categoryRoute");
const userRoute = require("./routes/userRoute");
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

// Global Veriable
global.userIn = null;

//Middlewares
app.use(express.static("public"));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(session({
    secret: "keyboard_cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1/smartedu-db" }), //uygulamayı kapattığımızda bile session kayıtlı kalır
  }));
  
app.use(fileUpload()); // file işlemlerini yapmamızı sağlar
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));

//Routes

app.use("*", (req, res, next) => {
  userIn = req.session.userId;
  next();
});
app.use("/", pageRoute);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);
app.use("/users", userRoute);

app.listen(port, () => {
  console.log(`Sunucu ${port} portu ile başlatıldı`);
});
