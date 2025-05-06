const Customer = require('../models/CustomerModel');


module.exports = {
    index: (_req, res) => {
        Customer.find({})
            .populate('address')
            .lean()
            .then((customers) => {
                res.render('customerViews/customers', { customers: customers })
            }).catch((err) => {
                res.send(err)
            })
    },
    create: (req, res) => {
        const newCustomer = new Customer(req.body);
        newCustomer.save()
            .then(() => {
                res.redirect('/customers');
            })
            .catch((err) => {
                res.send(err);
            });

    },
    customer: (req, res) => {
        Customer.findById(req.params.id)
            .populate('actions')
            .lean()
            .then((customer) => {
                res.render('customerViews/singleCustomer', customer)
            })
            .catch((err) => {
                res.send(err);
            });

    },
    update: (req, res) => {
        Customer.findByIdAndUpdate(req.params.id, req.body)
            .then((customer) => {
                res.redirect('/customers/' + customer._id + '/actions')/* Przekierowuje do odpwiedniego widoku customers z odpwiednio dopasowanym id klienta i jednocześnie przekierowuje na podzakładkę actions odwołującom się do tego klienta */
            })
            .catch((err) => {
                res.send(err);
            });

    },
    delete: (req, res) => {
        Customer.findByIdAndDelete(req.params.id)
            .then(() => {
                res.redirect('/customers')
            })
            .catch((err) => {
                res.send(err);
            })
    },
    editForm: (req, res) => {
        Customer.findById(req.params.id)
            .then((customer) => {
                res.render('customerViews/editCustomer', customer);
            })
            .catch((err) => {
                res.send(err);
            });
    },
    action: (req, res) => {
        Customer.findById(req.params.id)
            .populate('address')
            .lean()
            .then((customer) => {
                res.render('actionViews/addAction', customer)
            })
            .catch((err) => {
                res.send(err);
            });
    }
}