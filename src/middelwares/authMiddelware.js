const jwt = require('jsonwebtoken');
const Customer = require("../appModels/userModel");

module.exports = (req, res, next) => {
    const newToken = req.cookies['AddedToken']
    if (newToken) {

        try {
            const verified = jwt.verify(newToken, process.env.TOKEN_ACCESS);
            Customer.findById(verified._id).then((customer) => {
                res.locals.customerId = customer._id;
                res.locals.customerfullName = customer.fullName;
                res.locals.customerEmail = customer.email
                next();
            })
                .catch((err) => {
                    res.send(err)
                })

        } catch {
            res.redirect('/customer/login?loginRedirect=true ')
        }


    } else {
        res.redirect('/customer/login?loginRedirect=true')
    }
}