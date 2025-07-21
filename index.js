const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");


const propertyRoute = require("./routes/propertyRoute"); // adjust the path if needed
const globalErrorHandler = require("./controller/errorController");
const AppError = require("./utils/appError");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute"); // This seems to be unused in the provided code, but included for completeness
const userController = require("./controller/userController");

const app = express();
require("dotenv").config({ path: ".env" });
require("./utils/passport"); // Ensure passport strategies are loaded

app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000", // Adjust this to your frontend URL
    credentials: true, // Allow cookies to be sent
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log("Hi from middleware");
  next();
});

app.use(
  session({
    secret: "my-session-secert",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL, // your MongoDB connection string
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/property", propertyRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);

// app.get("/auth/google/callback", userController.googleAuthCallback);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

// // Handle undefined routes
// app.all("*", (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

app.use(globalErrorHandler);

module.exports = app;
