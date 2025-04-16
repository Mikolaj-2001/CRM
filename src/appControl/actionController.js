const Actions = require("../appModels/actionsModel");

module.exports = {
  createForm: (_req, res) => {
    res.render('actionViews/addAction')
  },
  create: (req, res) => {
    //TODO
  }
};
