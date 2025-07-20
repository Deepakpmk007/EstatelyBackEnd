const catchAsync = require("../utils/catchAsync");
const User = require("../models/userSchema");
const AppError = require("../utils/appError");
const passport = require("passport");
const APIFeatures = require("../utils/apiFeatures");

exports.register = catchAsync(async (req, res, next) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    next(new AppError("All field must enter", 422));
  }
  if (await User.findOne({ email })) {
    next(new AppError("email already is use", 409));
  }
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: "created user",
    result: {
      user: newUser,
    },
  });
});

exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(new AppError(info.message, 401));
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        status: "success",
        message: "Logged in successfully",
        user,
      });
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Logout failed",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Logged out successfully",
    });
  });
};
exports.googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

exports.googleAuthCallback = (req, res, next) => {
  passport.authenticate("google", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login?error=Google authentication failed");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  })(req, res, next);
};

////
exports.getAllUser = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const users = await features.query;

  if (property === 0) {
    res.status(400).json({
      status: "sucess",
      message: "no property",
    });
  }
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.id);
  if (!user)
    return next(new AppError(`No user Found. Check the id ${req.id}`), 401);
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res) => {
  const id = req.params.id;
  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!user) {
    return res.status(404).json({
      status: "fails",
      message: "invalis id",
    });
  }
  res.status(200).json({
    status: "sucess",
    data: {
      property,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return next(new AppError(`No user Found. Check the id ${id}`), 401);
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
