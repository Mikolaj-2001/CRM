const jwt = require('jsonwebtoken');
const User = require("../appModels/userModel");

module.exports = (req, res, next) => {
    const newToken = req.cookies['AddedToken']
    if (newToken) {

        try {
            const verified = jwt.verify(newToken, process.env.TOKEN_ACCESS);
            User.findById(verified._id).then((user) => {
                res.locals.userId = user._id;
                res.locals.userName = user.name;
                res.locals.userEmail = user.email
                next();
            })
                .catch((err) => {
                    res.send(err)
                })

        } catch {
            res.redirect('loginRedirect=true')
        }


    } else {
        res.redirect('loginRedirect=true')
    }
}