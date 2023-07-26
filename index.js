const app = require("./app");

const cloudinary = require("cloudinary");

const connectDatabase = require("./config/database");

const dotenv = require("dotenv")

// Handling uncaughtexception
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`Shutting down the server due to Uncaught exception`);
  process.exit(1);
});

// config
 
  dotenv.config({ path: "config/config.env" });
 

// connect to database
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on ${process.env.PORT}`);
});

// unhandle promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`Shutting down the server due to unhandled promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
