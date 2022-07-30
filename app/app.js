const express = require('express');
const routes = require('./routes');
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(routes)
const { _notFoundError, globalError } = require('./error')


app.get('/health', (_req, res) => {
    // const e = new Error('hello error')
    // e.status = 404
    // throw e
    res.status(200).json({
        message: 'Successfully done'
    })
})

app.use(globalError)
module.exports = app