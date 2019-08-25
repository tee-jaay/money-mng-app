const router = require('express').Router()
const { getAll, createTransaction, updateTransaction, removeTransaction, getSingleTransaction } = require('../controllers/transactionController')
const authenticate = require('../authenticate')

router.get('/', authenticate, getAll)

router.post('/', authenticate, createTransaction)

router.get('/:transactionId', authenticate, getSingleTransaction)

router.put('/:transactionId', authenticate, updateTransaction)

router.delete('/:transactionId', authenticate, removeTransaction)

module.exports = router