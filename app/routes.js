const router = require('express').Router();

const dbsRoute = require('../routes/tickets')
router.use('/api/v1/tickets', dbsRoute)

module.exports = router