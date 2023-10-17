const mongoose = require("mongoose");
const { MONGODB_COMPASS } = require("../constant");
mongoose
  .connect(MONGODB_COMPASS)
  .then((result) => {
    console.log({ Database: "Connect Successfully" });
  })
  .catch((err) => {
    console.log({ Database: "Connect Unsuccessfully" });
  });
