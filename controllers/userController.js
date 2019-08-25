const registerValidator = require('../validator/registerValidator')
const loginValidator = require('../validator/loginValidator')
const User = require('../model/User')
const bcrypt = require('bcrypt')
const { catchServerError, resourceError } = require('../utils/error')
const jwt = require('jsonwebtoken')

// login controller
module.exports = {
    // user login
    login(req, res) {
        // Extract data from request
        let { email, password } = req.body
        // Validate data
        let validate = loginValidator({ email, password })
        if (!validate.isValid) {
            return res.status(400).json(validate.error)
        }

        // Check for user availability
        User.findOne({ email })
            // populate for transaction
            .then(user => {
                if (!user) {
                    return resourceError(res, 'User not found')
                }
                // Compare password
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        return catchServerError(res, err)
                    }
                    if (!result) {
                        return resourceError(res, 'Password doesn\'t match in database')
                    }
                    let token = jwt.sign({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        amount: user.amount,
                        income: user.income,
                        expense: user.expense,
                        transactions: user.transactions
                    }, 'SECRET-KEYWORD', { expiresIn: '2h' })
                    res.status(201).json({
                        message: 'Login successful',
                        token: `Bearer ${token}`
                    })
                })
            })
            .catch(error => catchServerError(res, error))

        // Generate token and response back

        // let name = req.body.name
        // let email = req.body.email
        // res.json({
        //     message: `Welcome ${name}, we will contact with you by ${email}`
        // })
    },
    // user registration
    register(req, res) {
        // read clients data
        let { name, email, password, confirmPassword } = req.body
        // validation check data
        let validate = registerValidator({ name, email, password, confirmPassword })

        if (!validate.isValid) {
            res.status(400).json(validate.error)
        } else {
            // console.log(email)
            // check for duplicate email
            User.findOne({ email })
                .then(user => {
                    if (user) {
                        return resourceError(res, 'Email already exist')
                    }

                    bcrypt.hash(password, 11, (err, hash) => {
                        if (err) {
                            return resourceError(res, 'Server error occured')
                        }
                        // new user object
                        let user = new User({
                            name,
                            email,
                            password: hash,
                            balance: 0,
                            expense: 0,
                            income: 0,
                            transactions: []
                        })
                        // save to database
                        user.save()
                            .then(user => {
                                res.status(201).json({
                                    // response back to data
                                    message: 'User created successfully',
                                    // user
                                })
                            })
                            .catch(error => catchServerError(res, error))
                        res.json(user)
                    })
                })
                .catch(error => catchServerError(res, error))
        }
    },

    allUsers(req, res) {
        User.find()
            .then(users => {
                res.status(200).json(users)
            })
            .catch(error => catchServerError(req, error))
    }
}