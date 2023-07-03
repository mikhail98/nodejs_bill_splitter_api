const mongoose = require('mongoose')
const propertiesProvider = require('../utils/propertiesProvider')

const billSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: false,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    billPhotoUrl: {
        type: String,
        required: false,
        unique: false
    },
    currency: {
        type: String,
        enum: propertiesProvider.getAvailableCurrencies(),
        required: true
    },
    payments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment'
    }]
}, {timestamps: true})

const Bill = mongoose.model('Bill', billSchema)

module.exports = Bill