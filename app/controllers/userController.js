const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

module.exports = {
  create: (req, res) => {
    const newUser = new User(req.body);
    newUser
      .save()
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => {
        if (err.code === 11000) {
          res.render("userViews/signupUser", {
            error: true,
            message: "User already exist",
            user: req.body,
          });
        }
      });
  },
  login: (req, res) => {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          res.render("userViews/loginUser", {
            error: true,
            message: "User doesn't exist",
            user: req.body,
          });
          return;
        }

        bcrypt.compare(req.body.password, user.password, (err, logged) => {
          if (err) {
            res.render("userViews/loginUser", {
              error: true,
              message: "Login error",
              user: { email: req.body.email, password: "" },
            });
          }

          if (logged) {
            const token = user.generateAuthToken(user);
            res.cookie("AuthToken", token);
            res.redirect("/customers");
          } else {
            res.render("userViews/loginUser", {
              error: true,
              message: "Login data does not match",
              user: { email: req.body.email, password: "" },
            });
          }
        });
      })
      .catch((err) => {
        res.send(err);
      });
  },
  logout: (_req, res) => {
    res.clearCookie("AuthToken");
    res.redirect("/user/login");
  },
};
