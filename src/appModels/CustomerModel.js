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
    phoneNumber: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    actions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Action",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", Customer);
