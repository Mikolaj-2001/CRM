const User = require("../appModels/UserModel");
const bcrypt = require("bcrypt");

module.exports = {
  create: (req, res) => {
    const newUser = User(req.body);
    newUser
      .save()
      .then(() => {
        res.redirect("/addCustomer");
      })
      .catch((err) => {
        if (err.code === 11000) {
          res.render("customerViews/customerList", {
            error: true,
            message: "Użytkownik o tych danych już istnieje",
            customer: req.body,
          });
        }
      });
  },
  login: (req, res) => {
    User.findOne({ email: req.body.email })
      .then((loggedCustomer) => {

        if (!loggedCustomer) {
          res.render("views/loggingView", {
            error: true,
            message: "Brak użytkownika w bazie danych",
            loggedCustomer: req.body,
          });
          return;
        }

        bcrypt.compare(req.body.password, customer.password, (err, logged) => {
          if (err) {
            res.render("views/loggingView", {
              error: true,
              message: "Błąd logowania",
              loggedCustomer: { email: req.body.email, password: "" },
            });
            return;
          }

          if (logged) {
            const newToken = loggedCustomer.generateAuthToken(loggedCustomer);
            res.cookie("AddedToken", newToken);
            res.redirect("addCustomer");
          } else {
            res.render("views/loggingView", {
              error: true,
              message: "Dane do logowania nie są ze sobą spójne",
              loggedCustomer: { fullName: req.body.fullName, password: "" },
            });
            return;
          }
        });
      })
      .catch((err) => {
        res.status(500).send('Wystąpił błąd podczas logowania');
      });
  },
  logout: (_req, res) => {
    res.clearCookie('AddedToken');
    res.redirect('/loggedCustomer/login');
  }
};
