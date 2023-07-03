const express = require('express')

const ConfigService = require('../service/ConfigService')
const logMiddleware = require('../middleware/logMiddleware')
const tokenVerifierMiddleware = require("../middleware/tokenVerifierMiddleware")

const router = express.Router()

router.get('/currencies', logMiddleware, tokenVerifierMiddleware, async (req, res) => {
    // #swagger.tags = ['Config']

    return await ConfigService.getAvailableCurrencies(res)
})

module.exports = router