const bcrypt = require("bcrypt"); //password hashleme için kullanırız
const User = require("../models/User");
const Category = require("../models/Category");
const Course = require("../models/Course");

exports.createUser = async (req, res) => {
  try {
    //const user = await User.create(req.body);
    await User.create(req.body);
    res.status(201).redirect("/login");
  } catch (error) {
    res.status(400).json({
      status: "Bad Request",
      error,
    });
  }
};
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      console.log("Şifre : " + match);

      if (match) {
        //SESSION ISLEMLERI
        req.session.userId = user._id;
        res.status(200).redirect("/users/dashboard");
      } else {
        console.log("şifreniz yanlış");
        res.status(400).send("HATALI ŞİFRE");
      }
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.logoutUser = async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userId });
 
  const categories = await Category.find();
  const courses = await Course.find({ user: user._id });
 
  res.status(200).render("dashboard", {
    pageName: "dashboard",
    user,
    categories,
    courses,
  });
};
