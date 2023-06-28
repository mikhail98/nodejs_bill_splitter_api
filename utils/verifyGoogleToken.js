const {OAuth2Client} = require("google-auth-library")

function getGoogleWebAuthClientId() {
    let googleWebAuthClientId = process.env.GOOGLE_WEB_AUTH_CLIENT_ID
    if (!googleWebAuthClientId) {
        const {GOOGLE_WEB_AUTH_CLIENT_ID} = require('../utils/properties')
        googleWebAuthClientId = GOOGLE_WEB_AUTH_CLIENT_ID
    }
    return googleWebAuthClientId
}

const client = new OAuth2Client(getGoogleWebAuthClientId())

module.exports = async function verifyGoogleToken(email, token) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: [getGoogleWebAuthClientId()]
        });
        const payload = ticket.getPayload();
        return email === payload['email']
    } catch (error) {
        return false
    }
}