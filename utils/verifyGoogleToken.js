const Properties = require('./properties')
const {OAuth2Client} = require("google-auth-library")

const GOOGLE_WEB_AUTH_CLIENT_ID = process.env.GOOGLE_WEB_AUTH_CLIENT_ID || Properties.GOOGLE_WEB_AUTH_CLIENT_ID
const client = new OAuth2Client(GOOGLE_WEB_AUTH_CLIENT_ID)

module.exports = async function verifyGoogleToken(email, token) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: [GOOGLE_WEB_AUTH_CLIENT_ID]
        });
        const payload = ticket.getPayload();
        return email === payload['email']
    } catch (error) {
        return false
    }
}