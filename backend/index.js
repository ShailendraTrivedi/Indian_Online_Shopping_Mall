const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("./configs/dbConnect");
const path = require("path");

/** Import Secret Data */
const { PORT, ORIGIN_CORS } = require("./constant");

/** Import Routers */
const UserRouter = require("./routers/userRouter");
const CartRouter = require("./routers/cartRouter");
const ProductRouter = require("./routers/productRouter");
const OrderRouter = require("./routers/orderRouter");
const OTPRouter = require("./models/OTPRouter");

/** Middleware */
const app = express();
app.use(express.json());
const corsOptions = {
  origin: ORIGIN_CORS,
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cookieParser());

/** Router */
app.use("/user", UserRouter);
app.use("/otp", OTPRouter);
app.use("/product", ProductRouter);
app.use("/cart", CartRouter);
app.use("/order", OrderRouter);

try {
  app.listen(5000, () => {
    console.log({
      Server: "Connect Successfully",
      PORT: PORT,
    });
  });
} catch (error) {
  console.log({
    Server: "Connect Unsuccessfully",
  });
}
