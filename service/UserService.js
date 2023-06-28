const User = require('../model/user')
const Error = require('../utils/errors')
const createJWT = require('../utils/createJWT')
const verifyGoogleToken = require('../utils/verifyGoogleToken')

class UserService {

    static async createUser(name, email, googleToken, bio, fcmToken, res) {
        const oldUser = await User.findOne({email})
        if (oldUser) {
            return res.status(400).send(Error.userExits)
        }

        const isValidToken = await verifyGoogleToken(email, googleToken)
        if (!isValidToken) {
            return res.status(400).send(Error.invalidGoogleToken)
        }

        let fcmTokens
        if (fcmToken) {
            fcmTokens = [fcmToken]
        } else {
            fcmTokens = []
        }

        const user = await User.create({
            name: name,
            email: email.toLowerCase(),
            fcmTokens: fcmTokens,
            bio: bio
        })
        user.token = createJWT(user._id)
        user.fcmTokens = []

        return res.status(200).send(user)
    }

    static async getUser(_id, res) {
        const user = await User.findOne({_id})
        if (!user) {
            return res.status(400).send(Error.noSuchUser)
        }

        user.fcmTokens = []

        res.status(200).send(user)
    }

    static async userExists(email, res) {
        const user = await User.findOne({email})
        return res.status(200).send({exists: user !== null})
    }

    static async updateFcmToken(user, fcmToken, res) {
        const _id = user._id
        const fcmTokens = user.fcmTokens
        fcmTokens.push(fcmToken)
        await User.findOneAndUpdate({_id}, {fcmTokens})

        res.status(200).send()
    }

    static async updateAvatarUrl(user, avatarUrl, res) {
        const _id = user._id
        await User.findOneAndUpdate({_id}, {avatarUrl})

        res.status(200).send()
    }
}

module.exports = UserService