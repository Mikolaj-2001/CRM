const mongoose = require("mongoose");

const Customer = new mongoose.Schema(
  {
    name: String,
    address: {
      street: String,
      zipCode: String,
      city: String,
    },
    nip: String,
    phone: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", Customer);
