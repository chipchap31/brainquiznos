module.exports = (req, res, next) => {
  if (!req.session.user) {
    return res.render("index", { loggedIn: false });
  }

  next();
};
