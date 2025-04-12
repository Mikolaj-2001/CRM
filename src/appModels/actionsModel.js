const mongoose = require('mongoose')

const Actions = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    meetingDate: { type: Date, required: true },
    statusOfAsignment: { type: String, required: true },
    description: { type: String, required: true },
    ISBN: { type: String, required: true, unique: true },
    financialRatingsId: { type: String, required: true, unique: true }
})

module.exports = mongoose.model("Actions",Actions)