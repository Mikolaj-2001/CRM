const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./app/middlewares/authMiddleware");
const path = require("path");
const dayjs = require("dayjs");/* Pakiet zawierający funkcje odczytu dat i czasu,jak i zapisu ich w czytelnym formacie */

mongoose.connect("mongodb://127.0.0.1:27017/project-2");

const customerRouter = require("./app/router/customerRouter");
const userRouter = require("./app/router/userRouter");

app.engine(
  "hbs",
  hbs.engine({
    extname: ".hbs",
    helpers: {/* Obiekt przekazujący funkcje dla silnika widoku,aby z łatwością obsługiwał format dat i czasu */
        formatDate: (date) => {
            return dayjs(date).format("YYYY-MM-DD HH:mm");/* Tworzy czytelny zapis daty z odczytanego formatu daty przesłąnego przez serwer na stronie */
          },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "app/views"));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/customers", authMiddleware, customerRouter);
app.use("/user", userRouter);

app.get("/", function (_req, res) {
  res.redirect("/customers");
});

app.listen(8080, function () {
  console.log("Serwer Node.js działa");
});
