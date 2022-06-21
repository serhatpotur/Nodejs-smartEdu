const bcrypt = require("bcrypt"); //password hashleme için kullanırız
const { validationResult } = require("express-validator");
const User = require("../models/User");
const Category = require("../models/Category");
const Course = require("../models/Course");

exports.createUser = async (req, res) => {
  try {
    //const user = await User.create(req.body);
    await User.create(req.body);
    res.status(201).redirect("/login");
  } catch (error) {
    const errors = validationResult(req);

    for (let i = 0; i < errors.array().length; i++) {
      req.flash("error", `${errors.array()[i].msg}`);
    }

    res.status(400).redirect("/register");
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
        req.flash("error", "Your Password is Not Correct !");
        res.status(400).redirect("/login");
      }
    } else {
      req.flash("error", "User is not exist !");
      res.status(400).redirect("/login");
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
  const user = await User.findOne({ _id: req.session.userId }).populate(
    "courses"
  );
  const allUsers = await User.find();

  const categories = await Category.find();
  const courses = await Course.find({ user: user._id })
    .sort("-createdDate")
    .populate("category");

  res.status(200).render("dashboard", {
    pageName: "dashboard",
    user,
    categories,
    courses,
    allUsers,
  });
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove({
      _id: req.params.id,
    });
    await Course.deleteMany({ user: req.params.id });  //Silinen usera bağlı olan kurslarıda siler
    
    req.flash("success", `" ${user.name} " has been deleted successfully`);
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).redirect("users/dashboard");
    req.flash("error", `" ${user.name} " could not be deleted`);
  }
};
