const validator = require('validator')

const validate = user => {
    let error = {}

    if (!user.email) {
        error.email = 'Please provide your Email'
    } else if (!validator.isEmail(user.email)) {
        error.email = 'Please provide a valid Email'
    }

    if (!user.password) {
        error.password = 'Please provide a Password'
    }

    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

module.exports = validate