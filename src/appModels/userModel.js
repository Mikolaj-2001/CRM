const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const newCustomer = new mongoose.Schema(
    {
        fullName: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, unique: true },
        address: {
            street: String,
            postCode: String,
            city: String,
        },
        nip: { type: String, required: true, unique: true },
        customers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Customer",
            },
        ],
    },
    {
        timestamps: true,
    }
);

newCustomer.pre("save", function (next) {
    const newCustomer = this;

    if (!newCustomer.isModified("password")) {
        return next();
    }

    bcrypt.genSalt(20, function (err, salt) {
        if (err) {
            res.send(err);
        }

        bcrypt.hash(newCustomer.password, salt, function (err, hash) {
            if (err) {
                res.send(err);
            }

            newCustomer.password = hash;
            next();
        });
    });
});

newCustomer.methods.generateAuthToken = (customer) => {
    const newToken = jwt.sign({ _id: customer._id }, process.env.TOKEN_KEY, {
        expiresIn: "2h",
    });
    return newToken;
};

module.exports = mongoose.model("newCustomer", newCustomer);
