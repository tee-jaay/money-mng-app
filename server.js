const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const path = require('path')

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

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to our Application'
    })
})

const PORT = process.env.PORT || 4000

if (process.env.NODE_ENV === 'production') {
    app.listen(PORT, () => {
        console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
        mongoose.connect(`mongodb://${process.env.dbUsername}:${process.env.dbPassword}@ds213178.mlab.com:13178/money-mng-app`,
            { useNewUrlParser: true },
            () => {
                console.log("MongoDB connected to mlab...")
            });
    })
} else {
    app.listen(PORT, () => {
        console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
        mongoose.connect('mongodb://localhost/money-management-app',
            { useNewUrlParser: true },
            () => {
                console.log("MongoDB connected...")
            });
    })
}