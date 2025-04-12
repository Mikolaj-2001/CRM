const express = require('express')
const secondRouting = express.Router()

const customerController = require("../appControl/userControl")

secondRouting.get('', (_req, res) => {
    res.render('views/addCustomer')
})
secondRouting.post('/login', customerController.create)

secondRouting.get('/login', (req, res) => {
    if (req.query.loginRedirect) {
        res.render('views/loggingView', {
            error: true,
            message: "Zaloguj się,aby uzyskać dostęp"
        })
        return
    }
    res.render('views/loggingView')
})

secondRouting.post('/login', customerController.login)
secondRouting.get('/logout', customerController.logout)

module.exports = secondRouting