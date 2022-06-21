const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt"); //password hashleme için kullanırız
const { response } = require("express");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Student", "Teacher", "Admin"], //kullanıcı yetkileri
    default: "student",
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

// userSchema.pre("save", function (next) {
//   const user = this;
//   bcrypt.hash(user.password, 10, (error, hash) => {
//     // 10 değeri şifreyi daha karmaşık yapmak için
//     user.password = hash;
//     next();
//   });  
// });

userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);
          user.password = hash;
          next();
      });
  });
});

const User = mongoose.model("User", userSchema);
module.exports = User;


