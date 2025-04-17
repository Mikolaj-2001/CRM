const Customer = require("../appModels/CustomerModel");

module.exports = {
  index: (_req, res) => {
    Customer.find({})
      .lean()
      .then(function (customers) {
        res.render("customerViews/listCustomers", { customers });
      })
      .catch((err) => {
        res.send(err);
      });
  },
  customer: (req, res) => {
    Customer.findById(req.params.id)
      .populate("actions")
      .lean()
      .then((customer) => {
        res.render("customerViews/singleCustomer", customer);
      })
      .catch((err) => {
        res.send(err);
      });
  },
  create: (req, res) => {
    const { fullName, nip, postCode, street, city, phoneNumber } = req.body;

    const newCustomer = new Customer({
      fullName: fullName,
      address: {
        street: street,
        city: city,
        postCode: postCode,
      },
      phoneNumber: phoneNumber,
      nip: nip,
    });

    newCustomer
      .save()
      .then((savedCustomer) => {
        console.log("Zapisane dane:", savedCustomer);
        res.redirect("/");
      })
      .catch((err) => {
        res.send(err);
      });
  },
  update: (req, res) => {
    const { fullName, nip, postCode, street, city, phoneNumber } = req.body;

    const updatedCustomer = {
      fullName: fullName,
      address: {
        street: street,
        city: city,
        postCode: postCode,
      },
      phoneNumber: phoneNumber,
      nip: nip,
    };

    Customer.findByIdAndUpdate(req.params.id, updatedCustomer)
      .then((customer) => {
        res.redirect("/" + customer._id);
      })
      .catch((err) => {
        res.send(err);
      });
  },
  delete: (req, res) => {
    Customer.findByIdAndDelete(req.params.id)
      .then(() => {
        res.redirect("/");
      })
      .catch((err) => {
        res.send(err);
      });
  },
  editForm: (req, res) => {
    Customer.findById(req.params.id)
      .then((customer) => {
        res.render("customerViews/editCustomer", customer);
      })
      .catch((err) => {
        res.send(err);
      });
  },
};
