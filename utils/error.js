module.exports = {
    catchServerError(res, error) {
        console.log(error)
        res.status(500).json({
            message: 'Server error'
        })
    },
    resourceError(res, message) {
        res.status(400).json({
            message
        })
    }
}