const mongoose = require("mongoose");

const Action = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  date: { type: Date, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Action", Action);
