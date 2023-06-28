const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: false,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    bio: {
        type: String,
        required: false,
    },
    fcmTokens: [{
        type: String,
        unique: false,
        required: false,
    }],
    avatarUrl: {
        type: String,
        unique: false,
        required: false,
    },
    token: {
        type: String,
        unique: false,
        required: false,
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User