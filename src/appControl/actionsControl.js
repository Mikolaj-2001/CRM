const Actions = require("../appModels/actionsModel");

module.exports = {
  customer: (req, res) => {
    Customer.findById(req.params.id)
      .lean()
      .then((customer) => {
        Actions.find({ customerId: customer._id }) 
          .lean()
          .then((actions) => {
            res.render("views/singleLoggedCustomer", { customer, actions });
          })
          .catch((err) => {
            res.send(err);
          });
      })
      .catch((err) => {
        res.send(err);
      });
  },
};
