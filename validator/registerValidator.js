const validator = require('validator')

const validate = user => {
    let error = {}

    if (!user.name) {
        error.name = 'Please provide your Name'
    }

    if (!user.email) {
        error.email = 'Please provide your Email'
    } else if (!validator.isEmail(user.email)) {
        error.email = 'Please provide a valid Email'
    }

    if (!user.password) {
        error.password = 'Please provide a Password'
    } else if (user.password.length < 6) {
        error.password = 'Password must be => 6 characters'
    }

    if (!user.confirmPassword) {
        error.confirmPassword = 'Please provide Confirmation Password'
    } else if (user.password !== user.confirmPassword) {
        error.confirmPassword = 'Passwords doesn\'t match'
    }

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

module.exports = validate