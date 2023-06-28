const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const {initSocket} = require('./utils/socket')
const {MONGODB_URL} = require('./utils/properties')

const userRouter = require('./route/user')
const authRouter = require('./route/auth')

const app = express()
const port = process.env.PORT || 80

const serverVersion = "1.0"

const mongoUrl = process.env.MONGODB_URL || MONGODB_URL

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected'))
    .catch((error) => {
        console.error('MongoDB Connection Error:', error)
    })

app.use(bodyParser.json())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*')
    res.header("Access-Control-Allow-Methods", '*')
    res.header("Access-Control-Allow-Headers", '*')

    next()
})

app.use('/auth', authRouter)
app.use('/users', userRouter)

const server = app.listen(port, () => {
    console.log(`Server has been started at port: ${port}`)
    console.log(`Server version: ${serverVersion}`)
})

initSocket(server)