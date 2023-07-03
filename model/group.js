const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: false,
        required: true,
    },
    description: {
        type: String,
        unique: false,
        required: false,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: false,
        required: false
    },
    bills: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bill'
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    transfers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transfer'
    }],
    avatarPhotoUrl: {
        type: String,
        unique: false,
        required: false,
    }
}, {timestamps: true})

const Group = mongoose.model('Group', groupSchema)

module.exports = Group