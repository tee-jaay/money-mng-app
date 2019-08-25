const Transaction = require('../model/Transaction')
const { catchServerError } = require('../utils/error')
const User = require('../model/User')

module.exports = {
    createTransaction(req, res) {
        let { amount, note, type } = req.body
        console.log(amount)
        let userId = req.user._id

        let transaction = new Transaction({
            amount, note, type, author: userId
        })

        transaction.save()
            .then(trans => {
                let updatedUser = { ...req.user._doc }
                console.log(updatedUser)
                if (type === 'income') {
                    updatedUser.balance = updatedUser.balance + amount
                    updatedUser.income = updatedUser.income + amount
                } else if (type === 'expense') {
                    updatedUser.balance = updatedUser.balance - amount
                    updatedUser.expense = updatedUser.expense + amount
                }
                // console.log(updatedUser.transactions)
                updatedUser.transactions.unshift(trans._id)
                User.findOneAndUpdate(updatedUser._id, { $set: updatedUser }, { new: true })
                    .then(result => {
                        res.status(201).json({
                            message: 'Transaction created successfully',
                            ...trans._doc,
                            user: result
                        })
                    })
                    .catch(error => catchServerError(res, error))
            })
            .catch(error => catchServerError(res, error))
    },
    getAll(req, res) {
        let { _id } = req.user
        Transaction.find({ author: _id })
            .then(transactions => {
                if (transactions.length === 0) {
                    res.status(200).json({
                        message: 'No transaction found'
                    })
                } else {
                    res.status(200).json(transactions)
                }
            })
            .catch(error => catchServerError(res, error))
    },
    getSingleTransaction(req, res) {
        let { transactionId } = req.params
        Transaction.findById(transactionId)
            .then(transaction => {
                if (!transaction) {
                    res.status(200).json({
                        message: 'No transaction found'
                    })
                } else {
                    res.status(200).json(transaction)
                }
            })
            .catch(error => catchServerError(res, error))
    },
    updateTransaction(req, res) {
        let { transactionId } = req.params
        Transaction.findOneAndUpdate({ _id: transactionId }, { $set: req.body }, { new: true })
            .then(result => {
                res.status(200).json({
                    message: 'Updated successfully',
                    transaction: result
                })
            })
            .catch(error => catchServerError(res, error))
    },
    removeTransaction(req, res) {
        let { transactionId } = req.params
        Transaction.findOneAndDelete({ _id: transactionId })
            .then(
                result => {
                    res.status(200).json({
                        message: 'Removed successfully',
                        ...result._doc
                    })
                }
            )
            .catch(error => catchServerError(res, error))
    }
}