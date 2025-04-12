require("dotenv").config();
const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// mongoose.connect("mongodb://127.0.0.1:27017/CRM");

const userRouting = require('./src/routing/userRouting')
const postRouting = require("./src/routing/customerRouting");

const authMiddelware = require('./src/middelwares/authMiddelware')

app.engine(
  "hbs",
  hbs.engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "src/views/layouts"),
    helpers: {
      plusOne: function (value) {
        return value + 1;
      },
    },
  })
);

app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "src/views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

//app.use('', authMiddelware, userRouting)
app.use("", postRouting);

app.listen(process.env.APP_PORT || 6010, function () {
  console.log("Serwer działa na porcie-" + (process.env.APP_PORT || 6010));
});
