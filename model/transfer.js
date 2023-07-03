const mongoose = require('mongoose')
const propertiesProvider = require("../utils/propertiesProvider");

const transferSchema = new mongoose.Schema({
    userFrom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: false
    },
    userTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: false
    },
    moneyPhotoUrl: {
        type: String,
        required: true,
        unique: false
    },
    amount: {
        type: Number,
        required: true,
        unique: false
    },
    currency: {
        type: String,
        enum: propertiesProvider.getAvailableCurrencies(),
        required: true
    }
}, {timestamps: true})

const Transfer = mongoose.model('Transfer', transferSchema)

module.exports = Transfer