const mongoose = require("mongoose");

const Action = new mongoose.Schema(
  {
    contactDate: { type: Date, required: true },
    actionType: { type: String, required: true },
    description: { type: String, required: true },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Action", Action);
