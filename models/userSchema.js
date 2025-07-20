const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema(
  {
    userName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email must enter!"],
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "password must enter!"],
    },
    passwordConfirm: {
      type: String,
      required: [true, "please confirm your password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
      },
      message: "password not match!",
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // allow multiple nulls
    },
    role: {
      type: String,
      enum: ["user", "admin", "owner"],
      default: "user",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
const User = mongoose.model("User", UserSchema);

module.exports = User;
