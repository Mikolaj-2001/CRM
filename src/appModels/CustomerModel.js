const mongoose = require("mongoose");

const Customer = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    address: {
      street: String,
      postCode: String,
      city: String,
    },
    nip: String,
    phoneNumber: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", Customer);
