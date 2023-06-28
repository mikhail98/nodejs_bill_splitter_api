const {OAuth2Client} = require("google-auth-library")
const propertiesProvider = require('../utils/propertiesProvider')

const client = new OAuth2Client(propertiesProvider.getGoogleWebAuthClientId())

module.exports = async function verifyGoogleToken(email, token) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: [propertiesProvider.getGoogleWebAuthClientId()]
        });
        const payload = ticket.getPayload();
        return email === payload['email']
    } catch (error) {
        return false
    }
}