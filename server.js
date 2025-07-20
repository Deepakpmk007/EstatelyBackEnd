const app = require("./index");
require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected !!!!");
  })
  .catch((err) => {
    console.log(err.message);
  });

const port = 5000;

app.listen(port, () => {
  console.log(`server run on ${port}`);
});
