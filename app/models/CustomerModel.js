const mongoose = require("mongoose");

const Customer = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      zipcode: { type: String, required: true },
    },
    nip: Number,
    actions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Action",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", Customer);
