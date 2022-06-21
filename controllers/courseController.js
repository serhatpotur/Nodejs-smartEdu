const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");

exports.createCourse = async (req, res) => {
  try {
    //const course = await Course.create(req.body);
    const course = await Course.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      user: req.session.userId,
    });

    req.flash("success", `${course.name} has been created successfully`);
    res.status(201).redirect("/courses");
  } catch (error) {
    res.status(400).redirect("/courses");
    req.flash("error", `${course.name} has been creation failed`);
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const categorySlug = req.query.categories;
    const category = await Category.findOne({ slug: categorySlug });

    const query = req.query.search;

    let filter = {};
    if (categorySlug) {
      filter = { category: category._id };
    }
    if (query) {
      filter = { name: query };
    }

    if (!query && !categorySlug) {
      filter.name = "";
      filter.category = null;
    }

    const courses = await Course.find({
      $or: [
        { name: { $regex: ".*" + filter.name + ".*", $options: "i" } },
        { category: filter.category },
      ],
    })
      .sort("-createdDate")
      .populate("user");
    const categories = await Category.find({});

    res.status(200).render("courses", {
      courses: courses,
      categories: categories,
      //users: users,
      pageName: "courses",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.session.userId });
    const course = await Course.findOne({ slug: req.params.slug }).populate(
      "user"
    );
    const categories = await Category.find();

    res.status(200).render("course", {
      course: course,
      user: user,
      categories: categories,
      pageName: "courses",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
exports.enrollCourse = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.session.userId });
    //course_id değerini course.ejs dosyasında ki formun içinde ki inputtan alıyoruz. eklemek istediğimiz coursenin id değerini yakalamak için yazıyoruz
    await user.courses.push({ _id: req.body.course_id });
    // const course = Course.findById({ _id: req.body._id });

    // console.log(course.name);
    await user.save();
    res.redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
exports.releaseCourse = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.session.userId });
    //const course = Course.findById({ _id: req.body._id });
    await user.courses.pull({ _id: req.body.course_id });

    await user.save();
    res.redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findOneAndRemove({
      slug: req.params.slug,
    });
    req.flash(
      "success",
      `" ${deletedCourse.name} " has been deleted successfully`
    );
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug }).populate('category');
    course.name = req.body.name;
    course.description = req.body.description;
    course.category = req.body.category;
    course.save();
    req.flash("success", `" ${course.name} " has been updated successfully`);
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
