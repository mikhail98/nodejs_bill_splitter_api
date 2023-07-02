const admin = require("firebase-admin")
const FCM = require('fcm-notification')

const User = require("../model/user")
const serviceAccount = require("./bill-splitter-private-key.json")

const FCMClient = new FCM(admin.credential.cert(serviceAccount))

async function sendPushNotification(fcmToken, data, callback) {
    try {
        let message = {
            android: {
                data: data,
            },
            token: fcmToken
        }

        FCMClient.send(message, function (error, resp) {
            callback(fcmToken, !error)
        })

    } catch (error) {
        callback(fcmToken, false)
    }
}

async function sendPushNotifications(userId, data) {
    const user = await User.findOne({_id: userId})
    if (!user) return

    const sourceTokens = user.fcmTokens
    const resultTokens = []
    sourceTokens.forEach(token => {
        sendPushNotification(token, data, async function (token, isSuccessful) {
            if (isSuccessful) {
                resultTokens.push(token)
            } else {
                resultTokens.push(null)
            }
            if (resultTokens.length === sourceTokens.length) {
                await User.updateOne({_id: userId}, {fcmTokens: resultTokens.filter(token => token)})
            }
        })
    })
}

module.exports = sendPushNotifications
