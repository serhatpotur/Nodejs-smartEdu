const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    req.flash("success", `" ${category.name} " has been created successfully`);
    res.status(201).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "Bad Request",
      error,
    });
  }
};

exports.getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({
      status: "success",
      categories,
    });
  } catch (error) {
    res.status(400).json({
      status: "Bad Request",
      error,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndRemove({
      _id: req.params.id,
    });
    req.flash("success", `" ${category.name} " has been deleted successfully`);
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findOne({
      slug: req.params.slug,
    });
    category.name = req.body.name;
    category.save();
    req.flash("success", `" ${category.name} " has been updated successfully`);
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
