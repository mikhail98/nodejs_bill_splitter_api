const propertiesProvider = require('../utils/propertiesProvider')

class ConfigService {
    static async getAvailableCurrencies(res) {
        res.status(200).send({currencies: propertiesProvider.getAvailableCurrencies()})
    }
}

module.exports = ConfigService