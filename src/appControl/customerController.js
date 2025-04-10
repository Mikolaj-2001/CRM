const Customer = require("../appModels/CustomerModel");
/* const User = require("../appModels/userModel")
const bcrypt = require('bcrypt') */

module.exports = {
  index: (req, res) => {
    Customer.find({})
      .lean()
      .then((customers) => {
        res.render("customersViews/listCustomers", { customers });
      })
      .catch((err) => {
        res.send(err);
      });
  },
  customer: (req, res) => {
    Customer.findById(req.params.id)
      .lean()
      .then((post) => {
        res.render("", post);
      })
      .catch((err) => {
        res.send(err);
      });
  },
  create: (req, res) => {
    const { name, nip, zipCode, street, city } = req.body;

    const newCustomer = new Customer({
      name: name,
      address: {
        street: street,
        city: city,
        zipCode: zipCode,
      },
      nip: nip,
    });

    newCustomer
      .save()
      .then((savedCustomer) => {
        console.log("Zapisane dane:", savedCustomer);
        res.redirect(`/`);
      })
      .catch((err) => {
        res.send(err);
      });
  },
  /*     update: (req, res) => {
        Customer.findByIdAndUpdate(req.params.id, req.body)
            .then((post) => {
                res.redirect("//" + post._id);
            })
            .catch((err) => {
                res.send(err);
            });
    },
    delete: (req, res) => {
        Customer.findByIdAndDelete(req.params.id)
            .then(() => {
                User.updateOne(
                    { _id: res.locals.userId },
                    { $pull: { posts: req.params.id } }
                ).catch((err) => {
                    res.send(err);
                });

                res.redirect("/");
            })
            .catch((err) => {
                res.send(err);
            });
    },
    editForm: (req, res) => {
        Customer.findById(req.params.id)
            .then((post) => {
                res.render("", post);
            })
            .catch((err) => {
                res.send(err);
            });
    }, */
};
