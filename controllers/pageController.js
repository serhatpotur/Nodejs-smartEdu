const nodemailer = require("nodemailer");
const Category = require("../models/Category");
const Course = require("../models/Course");
const User = require("../models/User");

exports.getIndexPage = async (req, res) => {
  const category = await Category.count();
  const courses = await Course.find().sort("-createdDate").limit(2);
  const totalCourses = await Course.find().countDocuments();
  const totalStudents = await User.countDocuments({ role: "Student" });
  const totalTeachers = await User.countDocuments({ role: "Teacher" });
  res.status(200).render("index", {
    pageName: "index",
    category,
    courses,
    totalCourses,
    totalStudents,
    totalTeachers,
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render("about", {
    pageName: "about",
  });
};
exports.getRegisterPage = (req, res) => {
  res.status(200).render("register", {
    pageName: "register",
  });
};
exports.getLoginPage = (req, res) => {
  res.status(200).render("login", {
    pageName: "login",
  });
};
exports.getContactPage = (req, res) => {
  res.status(200).render("contact", {
    pageName: "contact",
  });
};
exports.sendEmail = async (req, res) => {
  try {
    const outputMessage = `
    
  <h1> Message Details </h1>

  <ul>
  <li> Name : ${req.body.name} </li>
  <li> Email : ${req.body.email} </li>
  </ul>
  <h1> Message </h1>
  <p> ${req.body.message} </p>
  `;

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "serhatpotur1@gmail.com", // gmail account
        pass: "navzekwtieelyhdy", // gmail password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"Smart Edu Project 👻 <${req.body.email}>`, // sender address
      to: "serhatpotur1@gmail.com", // list of receivers
      subject: "Smart Edu Project ✔", // Subject line
      html: outputMessage, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    req.flash("success", "We Received Your Message Succesfully");
    res.status(200).redirect("/contact");
  } catch (error) {
    //req.flash("error", `Message Sending Failed  ${error}`);
    req.flash("error", `Message Sending Failed`);
    res.status(200).redirect("/contact");
  }
};
