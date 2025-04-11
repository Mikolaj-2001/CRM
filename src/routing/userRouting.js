const express = require('express')
const secondRouting = express.Router()

const userController = require("../appControl/userCon")

secondRouting.get('', (_req, res) => {
    res.render('')
})
secondRouting.post('', userController.create)

secondRouting.get('', (req, res) => {
    if (req.query.loginRedirect) {
        res.render('', {
            error: true,
            message: "Zaloguj się,aby uzyskać dostęp"
        })
        return
    }
    res.render('')
})

secondRouting.post('', userController.login)
secondRouting.get('', userController.logout)

module.exports = secondRouting