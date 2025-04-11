const jwt = require('jsonwebtoken');
const User = require("../appModels/userModel");

module.exports = (req, res, next) => {
    const newToken = req.cookies['AddedToken']
    if (newToken) {

        try {
            const verified = jwt.verify(newToken, process.env.TOKEN_ACCESS);
            User.findById(verified._id).then((customer) => {
                res.locals.userId = customer._id;
                res.locals.userName = customer.name;
                res.locals.userEmail = customer.email
                next();
            })
                .catch((err) => {
                    res.send(err)
                })

        } catch {
            res.redirect('')
        }


    } else {
        res.redirect('')
    }
}