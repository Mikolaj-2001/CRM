const Action = require("../appModels/actionsModel");
const { update } = require("./customerController");

module.exports = {
  createForm: (_req, res) => {
    res.render('actionViews/addAction')
  },
  create: (req, res) => {
    const { date, type, description } = req.body

    const newAction = new Action({
      date: date,
      type: type,
      description: description,
    })
    newAction
      .save()
      .then((savedAction) => {
        console.log("Przypisane akcje:", savedAction);
        res.redirect("/");
      })
      .catch((err) => {
        res.send(err);
      });
  },
  update: (req, res) => {
    const { date, type, description } = req.body

    const updatedAction = {
      date: date,
      type: type,
      description: description,
    }

    Action.findByIdAndUpdate(req.params.id, updatedAction)
      .then((action) => {
        res.redirect("/" + action._id)
      })
      .catch((err) => {
        res.send(err);
      });

  },

}

