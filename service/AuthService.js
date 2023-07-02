const User = require('../model/user')
const Error = require('../utils/errors')
const createJWT = require('../utils/createJWT')
const verifyGoogleToken = require('../utils/verifyGoogleToken')

class AuthService {

    static async login(email, googleToken, res) {
        const user = await User.findOne({email})

        if (!user) {
            return res.status(400).send(Error.noSuchUser)
        }

        if (googleToken) {
            const isValidGoogleToken = await verifyGoogleToken(user.email, googleToken)
            if (!isValidGoogleToken) {
                return res.status(400).send(Error.invalidGoogleToken)
            }
        } else {
            return res.status(400).send(Error.tokenRequired)
        }

        user.token = createJWT(user._id)
        user.fcmTokens = []

        return res.status(200).send(user)
    }

    static async logout(user, fcmToken, res) {
        const _id = user._id
        user.fcmTokens = user.fcmTokens.filter(token => token !== fcmToken)

        await User.updateOne({_id}, user)

        res.status(200).send()
    }
}

module.exports = AuthService