const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: false
    },
    text: {
        type: String,
        required: true,
        unique: false
    },
    isDeleted: {
        type: Boolean,
        required: false,
        unique: false
    }
}, {timestamps: true})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message