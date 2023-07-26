const express = require("express");

const app = express();

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const cors = require("cors")

const errorMiddleware = require("./middleware/error");
const fileUpload = require("express-fileupload");

// config

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "config/config.env" });
}

app.use(express.json());
app.use(cookieParser());
app.use("*",cors({
  origin: true,
  credentials: true,
}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Import
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// middlewares for Errors
app.use(errorMiddleware);

module.exports = app;
