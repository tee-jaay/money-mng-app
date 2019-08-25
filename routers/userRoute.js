const router = require('express').Router()
const { login, register, allUsers } = require('../controllers/userController')

// Registration Route 
router.post('/register', register)

// Login Route 
router.post('/login', login)

router.get('/all', allUsers)

module.exports = router