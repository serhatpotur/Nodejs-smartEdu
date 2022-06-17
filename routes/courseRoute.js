const express = require("express");
const courseController = require("../controllers/courseController");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();
// kullanıcının yetkisi admin veya teacher ise kurs oluşturabilir
router.route("/").post(roleMiddleware(['Admin','Teacher']),courseController.createCourse); // http://localhost:3000/courses
router.route("/").get(courseController.getAllCourses);
router.route("/:slug").get(courseController.getCourse);

module.exports = router;
