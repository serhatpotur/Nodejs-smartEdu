const mongoose = require("mongoose");
const slugify = require("slugify"); // http://localhost:3000/course/id kısmında id yerie başka bir değer yazmamızı salar
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  name: { type: String, unique: true, required: true },
  description: { type: String, required: true, trim: true },
  createdDate: { type: Date, default: Date.now },
  slug: { type: String, unique: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});

CourseSchema.pre("validate", function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;