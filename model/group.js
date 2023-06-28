const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: false,
        required: true,
    },
    description: {
        type: String,
        unique: false,
        required: false,
    },
    bills: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bill'
    }],
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {timestamps: true})

const Group = mongoose.model('Group', groupSchema)

module.exports = Group