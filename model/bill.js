const mongoose = require('mongoose')

const billSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: false,
        required: true,
    },
    payments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment'
    }]
}, {timestamps: true})

const Bill = mongoose.model('Bill', billSchema)

module.exports = Bill