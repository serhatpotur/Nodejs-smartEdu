module.exports = async (req, res, next) => {
  const user = await req.session.userId;
  if (user) {
    res.redirect("/");
  }
  next();
};
