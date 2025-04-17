const Actions = require("../appModels/actionsModel");
const { update } = require("./customerController");

module.exports = {
  createForm: (_req, res) => {
    res.render('actionViews/addAction')
  },
  create: (req, res) => {
    const { date, type, description } = req.body

    const newAction = new Actions({
      date: date,
      type: type,
      description: description,
    })
    newAction
      .save()
      .then((savedAction) => {
        console.log("Przypisane akcje:", savedAction);
        res.redirect(`/`);
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

    Actions.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { date, type, description } },
      { new: true },
      updatedAction
    )
      .then((updatedAction) => {
        if (!updatedAction) {
          return res.status(404).send('Akcja nie została zidentyfikowana.');
        }
        res.render("/", { action: updatedAction });
      }
      )
      .catch((err) => {
        console.error("Błąd podczas aktualizacji akcji:", err);
        res.status(500).send('Wystąpił błąd podczas aktualizacji akcji.');
      });
  },

}

