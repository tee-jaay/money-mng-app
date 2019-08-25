const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')

const userRouter = require('./routers/userRoute')
const transactionRouter = require('./routers/transactionRoute')

const app = express()

app.use(morgan('dev'))  // for development
app.use(cors()) // for development

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(passport.initialize())
require('./passport')(passport)

app.use('/api/users', userRouter)
app.use('/api/transactions', transactionRouter)

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to our Application'
    })
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
    mongoose.connect('mongodb://localhost/money-management-app',
        { useNewUrlParser: true },
        () => {
            console.log("MongoDB connected...")
        });
})