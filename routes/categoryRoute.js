const express = require("express");
const categoryController = require("../controllers/categoryController");

const router = express.Router();
router.route("/").post(categoryController.createCategory); 
router.route("/").get(categoryController.getAllCategory); 
router.route("/:id").delete(categoryController.deleteCategory); 
router.route("/:slug").put(categoryController.updateCategory); 



module.exports = router;
