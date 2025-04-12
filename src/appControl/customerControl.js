const Customer = require("../appModels/CustomerModel");
const User = require("../appModels/userModel")
const bcrypt = require('bcrypt')

module.exports = {
  index: (req, res) => {
    Customer.find({})
      .lean()
      .then((customers) => {
        res.render("customerViews/customerList", { customers });
      })
      .catch((err) => {
        res.send(err);
      });
  },
  customer: (req, res) => {
    Customer.findById(req.params.id)
      .lean()
      .then((Customer) => {
        res.render("views/", Customer);
      })
      .catch((err) => {
        res.send(err);
      });
  },
  create: (req, res) => {
    const { fullName, nip, postCode, street, city } = req.body;

    const newCustomer = new Customer({
      fullName: fullName,
      address: {
        street: street,
        city: city,
        postCode: postCode,
      },
      nip: nip,
    });

    newCustomer
      .save()
      .then((savedCustomer) => {
        console.log("Zapisane dane:", savedCustomer);
        res.redirect(`/customerList`);
      })
      .catch((err) => {
        res.send(err);
      });
  },
  update: (req, res) => {
    Customer.findByIdAndUpdate(req.params.id, req.body)
      .then((Customer) => {
        res.redirect("/customerList/" + Customer._id);
      })
      .catch((err) => {
        res.send(err);
      });
  },
  delete: (req, res) => {
    Customer.findByIdAndDelete(req.params.id)
      .then(() => {
        Customer.updateOne(
          { _id: res.locals.userId },
          { $pull: { posts: req.params.id } }
        ).catch((err) => {
          res.send(err);
        });

        res.redirect("/customerList");
      })
      .catch((err) => {
        res.send(err);
      });
  },
  editForm: (req, res) => {
    Customer.findById(req.params.id)
      .then((post) => {
        res.render("views/appActionsAsigning", post);
      })
      .catch((err) => {
        res.send(err);
      });
  },
};
