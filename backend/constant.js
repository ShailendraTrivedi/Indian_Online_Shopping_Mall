const dotenv = require("dotenv");
dotenv.config();
const {
  SECRET_KEY,
  PORT,
  MONGODB_COMPASS,
  TEMP_EMAIL,
  TEMP_PASSWORD,
  ORIGIN_CORS,
} = process.env;
module.exports = {
  SECRET_KEY,
  PORT,
  MONGODB_COMPASS,
  TEMP_EMAIL,
  TEMP_PASSWORD,
  ORIGIN_CORS,
};
