exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({
    status: "fail",
    message: "You need to log in first",
  });
};

exports.ensureAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  res.status(403).json({
    status: "fail",
    message: "You do not have permission to perform this action",
  });
};
