const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt"); //password hashleme için kullanırız

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
});

userSchema.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
    // 10 değeri şifreyi daha karmaşık yapmak için
    user.password = hash;
    next();
  });
});

const User = mongoose.model("User", userSchema);
module.exports = User;
