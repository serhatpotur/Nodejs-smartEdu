const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");

exports.createCourse = async (req, res) => {
  try {
    //const course = await Course.create(req.body);
    await Course.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      user: req.session.userId,
    });

    res.status(201).redirect("/courses");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const categorySlug = req.query.categories;
    const category = await Category.findOne({ slug: categorySlug });

    const userName = req.query.users;
    //console.log(userName)
    const user = await User.findOne({ name: userName });
    //console.log(user)

    let filter = {};
    if (categorySlug) {
      filter = {  category: category._id, };
    }

    const courses = await Course.find(filter)
      .sort("-createdDate")
      .populate("user");
    const categories = await Category.find({});
    const users = await User.find({});
    //const courses = await Course.find({ user: req.session.userId });

    //const coursess = await Course.find({ user: req.session.userId });

    res.status(200).render("courses", {
      courses: courses,
      categories: categories,
      users: users,
      pageName: "courses",
    });

    //res.status(200).json({ courses: courses, pageName: "courses" });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    //const course = await Course.findById({ _id: req.params.id });
    const course = await Course.findOne({ slug: req.params.slug }).populate(
      "user"
    );
    res.status(200).render("course", { course: course, pageName: "courses" });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
