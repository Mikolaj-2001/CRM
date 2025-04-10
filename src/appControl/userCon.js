const User = require("../appModels/userModel");
const bcrypt = require("bcrypt");

module.exports = {
  create: (req, res) => {
    const newUser = User(req.body);
    newUser
      .save()
      .then(() => {
        res.redirect("");
      })
      .catch((err) => {
        if (err.code === 11000) {
          res.render("", {
            error: true,
            message: "Użytkownik o tych danych już istnieje",
            user: req.body,
          });
        }
      });
  },
  login: (req, res) => {
    User.findOne({ email: req.body.email })
      .then((loggedUser) => {

        if (!loggedUser) {
          res.render("", {
            error: true,
            message: "Brak użytkownika w bazie danych",
            loggedUser: req.body,
          });
          return;
        }

        bcrypt.compare(req.body.password, user.password, (err, logged) => {
          if (err) {
            res.render("", {
              error: true,
              message: "Błąd logowania",
              loggedUser: { email: req.body.email, password: "" },
            });
            return;
          }

          if (logged) {
            const newToken = loggedUser.generateAuthToken(loggedUser);
            res.cookie("AddedToken", newToken);
            res.redirect("");
          } else {
            res.render("", {
              error: true,
              message: "Dane do logowania nie są ze sobą spójne",
              loggedUser: { name: req.body.name, password: "" },
            });
            return;
          }
        });
      })
      .catch((err) => {
        res.send(err);
      });
  },
  logout: (_req, res) => {
    res.clearCookie('AddedToken');
    res.redirect('');
  }
};
