const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customerController");
const actionController = require("../controllers/actionController");

router.get("/", customerController.index);

router.get("/add", (_req, res) => {
  res.render("customerViews/addCustomer");
});

router.post("/add", customerController.create);

router.get("/edit/:id", customerController.editForm);

router.post("/edit/:id", customerController.update);

router.get("/delete/:id", customerController.delete);

router.get("/:id/actions", customerController.customer);

router.get("/:id/actions/add", customerController.action);

router.post("/:id/actions/add", actionController.create);


router.get("/:customerId/actions/edit/:actionId", actionController.editForm);

router.post("/:customerId/actions/edit/:actionId", actionController.update);

router.get("/:customerId/actions/delete/:actionId", actionController.delete);

module.exports = router;
