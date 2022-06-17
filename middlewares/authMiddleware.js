const User = require("../models/User");

module.exports = async (req, res, next) => {
  const user = await User.findById(req.session.userId);
  //console.log(user);
  if (!user) return res.redirect("/login");
  next();

};
