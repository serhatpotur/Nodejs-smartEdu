const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({
      status: "success",
      category,
    });
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
