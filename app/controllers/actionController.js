const Action = require("../models/ActionModel");
const Customer = require("../models/CustomerModel");

module.exports = {
  create: (req, res) => {
    const newAction = new Action(req.body);
    newAction
      .save()
      .then(() => {
        Customer.updateOne(
          { _id: req.params.id },
          { $push: { actions: newAction._id } }
        )
          .then(() => {
            res.redirect(`/customers/${req.params.id}/actions`);
          })
          .catch((err) => {
            console.error(err);
            res.send(err);
          });
      })
      .catch((err) => {
        res.send(err);
      });
  },
  update: (req, res) => {
    Action.findByIdAndUpdate(req.params.actionId, req.body, { new: true })
      .then(() => {
        res.redirect(`/customers/${req.params.customerId}/actions`);
      })
      .catch((err) => {
        console.error(err);
        res.send(err);
      });
  },

  delete: (req, res) => {
    Action.findByIdAndDelete(req.params.actionId)
      .then(() => {
        Customer.updateOne(
          { _id: req.params.customerId },
          { $pull: { actions: req.params.actionId } }
        )
          .then(() => {
            res.redirect(`/customers/${req.params.customerId}/actions`);
          })
          .catch((err) => {
            console.error(err);
            res.send(err);
          });
      })
      .catch((err) => {
        console.error(err);
        res.send(err);
      });
  },
  editForm: (req, res) => {
    Action.findById(req.params.actionId)
      .lean()
      .then((action) => {
        if (action.contactDate) {
          action.contactDate = action.contactDate.toISOString().split("T")[0];
        }

        action.isTelefon = action.actionType === "Telefon";
        action.isSpotkanie = action.actionType === "Spotkanie";
        action.isInne = action.actionType === "Inne";

        res.render("actionViews/editAction", {
          action,
          customerId: req.params.customerId,
        });
      })
      .catch((err) => {
        console.error(err);
        res.send(err);
      });
  },
};
