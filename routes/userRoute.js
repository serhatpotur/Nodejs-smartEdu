const express = require("express");
const User = require("../models/User");
const { body } = require("express-validator");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();
router.route("/signup").post(
  [
    body("name").notEmpty().withMessage("Please Enter Your Name"),
    body("email").isEmail().withMessage("Please Enter a Valid Email Address")
    .custom((userEmail)=>{
        return User.findOne({email:userEmail}).then(user=>{
            if(user){
                return Promise.reject('Email is already exists !')
            }
        })

    })
    ,
    body("password").notEmpty().withMessage("Please Enter Your Password"),
  ],authController.createUser); //http://localhost:3000/users/signup

router.route("/login").post(authController.loginUser); //http://localhost:3000/users/login
router.route("/logout").get(authController.logoutUser); //http://localhost:3000/users/logout
// önce authMiddleware gidip kontrolü yapar sonra getDashboardPageye gider
// giriş yapmadan dashboard sayfasına yönlenmek isterse login sayfasına atacak
router.route("/dashboard").get(authMiddleware, authController.getDashboardPage); //http://localhost:3000/users/getDashboardPage
router.route("/:id").delete(authController.deleteUser); 


module.exports = router;
