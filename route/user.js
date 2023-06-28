const express = require('express')

const UserService = require('../service/UserService')
const logMiddleware = require('../middleware/logMiddleware')
const accessMiddleware = require('../middleware/accessMiddleware')
const tokenVerifierMiddleware = require("../middleware/tokenVerifierMiddleware")

const router = express.Router()

router.post('/', logMiddleware, async (req, res) => {
    // #swagger.tags = ['User']

    const {name, email, googleToken, bio, fcmToken} = req.body

    return await UserService.createUser(name, email, googleToken, bio, fcmToken, res)
})

router.post('/exists', logMiddleware, async (req, res) => {
    // #swagger.tags = ['User']

    const {email} = req.body

    return await UserService.userExists(email, res)
})

router.get('/:id', logMiddleware, tokenVerifierMiddleware, async (req, res) => {
    // #swagger.tags = ['User']

    const _id = req.params.id

    return await UserService.getUser(_id, res)
})

router.patch('/:id/fcmToken', logMiddleware, tokenVerifierMiddleware, accessMiddleware, async (req, res) => {
    // #swagger.tags = ['User']

    const {fcmToken} = req.body

    return await UserService.updateFcmToken(req.user, fcmToken, res)
})

router.patch('/:id/avatarUrl', logMiddleware, tokenVerifierMiddleware, accessMiddleware, async (req, res) => {
    // #swagger.tags = ['User']

    const {avatarUrl} = req.body

    return await UserService.updateAvatarUrl(req.user, avatarUrl, res)
})

module.exports = router