function getMongoUrl() {
    let mongoUrl = process.env.MONGODB_URL
    if (!mongoUrl) {
        const {MONGODB_URL} = require('../utils/properties')
        mongoUrl = MONGODB_URL
    }
    return mongoUrl
}

function getGoogleWebAuthClientId() {
    let googleWebAuthClientId = process.env.GOOGLE_WEB_AUTH_CLIENT_ID
    if (!googleWebAuthClientId) {
        const {GOOGLE_WEB_AUTH_CLIENT_ID} = require('../utils/properties')
        googleWebAuthClientId = GOOGLE_WEB_AUTH_CLIENT_ID
    }
    return googleWebAuthClientId
}

function getAvailableCurrencies(){
    return ['PLN', 'EUR', 'BYN', 'USD', 'CZK', 'HUF', 'UAH']
}

module.exports = {
    getMongoUrl, getGoogleWebAuthClientId, getAvailableCurrencies
}