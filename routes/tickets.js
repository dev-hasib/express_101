const router = require('express').Router()
const db = require('../db/db')

router.get('/t/:ticketId', (req, res) => {
    const userTicketId = req.params.ticketId
    const user = db.findByID(userTicketId)
    res.status(200).send(user)
})

router.get('/u/:username', (req, res) => {
    const ticketUsername = req.params.username
    const user = db.findByUsername(ticketUsername)
    res.status(200).send(user)
})

router.patch('/t/:ticketId', (req, res) => {
    const updateUserId = req.params.ticketId
    const ticketBody = req.body
    const updateUser = db.updateByID(updateUserId, ticketBody)
    res.status(202).json({
        "massage": "User updated successfully",
        updateUser
    })
})

router.patch('/u/:username', (req, res) => {
    const UpdateUsername = req.params.username
    const ticketBody = req.body
    const updateUser = db.updateByUsername(UpdateUsername, ticketBody)
    res.status(202).json({
        "massage": "User update successfully",
        updateUser
    })
})

router.delete('/t/:ticketId', (req, res) => {
    const deletedId = req.params.ticketId
    const deletedTicket = db.deleteByID(deletedId)
    res.status(200).json({
        "massage": "user deleted successfully",
        deletedTicket
    })
})

router.delete('/u/:username', (req, res) => {
    const deleteUsername = req.params.username
    const deletedTicket = db.deleteByUsername(deleteUsername)
    res.status(200).json({
        "massage": "Delete user successfully",
        deletedTicket
    })
})

router.post('/sell', (req, res) => {
    const { username, price } = req.body
    const ticket = db.createTicket(username, price)
    res.status(201).json({
        "massage": "User Crated successfully!", ticket
    });
})

router.post('/bulk', (req, res) => {
    const { username, price, quantity } = req.body
    const bulkTicket = db.bulkTicketCreate(username, price, quantity)
    res.status(201).json({
        "massage": "Bulk user create successfully",
        bulkTicket
    })
})

router.get('/draw', (req, res) => {
    const { wc } = req.query
    const winner = db.raffleDraw(wc)
    res.status(200).send(winner)
})

router.get('/', (_req, res) => {
    res.status(200).send(db.find())
})


module.exports = router