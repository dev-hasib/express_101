const notFoundError = (_req, _res, next) => {
    const error = new Error('Error occurred')
    error.status = 404
    next(error)
}

const globalError = (error, _req, res, _next) => {
    if (error.status) {
        return res.json({
            message: error.message
        })
    }
    res.json({
        message: 'This is server side error!'
    })
}

module.exports = {
    notFoundError,
    globalError
}