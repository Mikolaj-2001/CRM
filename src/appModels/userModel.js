const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        address: { type: String, required: true, unique: true },
        company: { type: String, required: true, unique: true },
        nip: { type: Number, required: true, unique: true },
        password: { type: String, required: true, unique: true },
        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "newPost",
            },
        ],
    },
    {
        timestamps: true,
    }
);

User.pre("save", function (next) {
    const newUser = this;

    if (!newUser.isModified("password")) {
        return next();
    }

    bcrypt.genSalt(20, function (err, salt) {
        if (err) {
            res.send(err);
        }

        bcrypt.hash(newUser.password, salt, function (err, hash) {
            if (err) {
                res.send(err);
            }

            newUser.password = hash;
            next();
        });
    });
});

User.methods.generateAuthToken = (user) => {
    const newToken = jwt.sign({ _id: user._id }, process.env.TOKEN_KEY, {
        expiresIn: "2h",
    });
    return newToken;
};

module.exports = mongoose.model("newUser", User);
