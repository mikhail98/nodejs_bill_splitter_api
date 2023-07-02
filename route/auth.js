const express = require('express')

const AuthService = require('../service/AuthService')
const logMiddleware = require('../middleware/logMiddleware')
const accessMiddleware = require('../middleware/accessMiddleware')
const tokenVerifierMiddleware = require("../middleware/tokenVerifierMiddleware")

const router = express.Router()

router.post('/login', logMiddleware, async (req, res) => {
    // #swagger.tags = ['Auth']

    const {email, googleToken} = req.body

    return await AuthService.login(email, googleToken, res)
})

router.post('/:id/logout', logMiddleware, tokenVerifierMiddleware, accessMiddleware, async (req, res) => {
    // #swagger.tags = ['Auth']

    const {fcmToken} = req.body

    return await AuthService.logout(req.user, fcmToken, res)
})

module.exports = router