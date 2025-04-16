const express = require('express')
const routing = express.Router()

const customerController = require('../appControl/customerController')
const actionController = require('../appControl/actionController')

routing.get('/', customerController.index)

routing.get('/add', (_req, res) => {
    res.render('customerViews/addCustomer')
})

routing.post("/add", customerController.create);

routing.get("/:id", customerController.customer);

routing.get("/edit/:id", customerController.editForm);

routing.post("/edit/:id", customerController.update);

routing.get("/delete/:id", customerController.delete);

/* Action management */

routing.get("/:id/addAction", actionController.createForm);


module.exports = routing