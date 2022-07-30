const Ticket = require('../models/Ticket')
const { readFile, writeFile } = require('../utils/fs')

const tickets = Symbol('tickets')

class myDB {
    constructor() {
        (async function () {
            this[tickets] = await readFile()
        }.call(this))
    }

    /**
     * this this method create a user ticket
     * @param {string} username 
     * @param {number} price 
     * @return {Ticket} create a new Ticket
     */
    createTicket(username, price) {
        const ticket = new Ticket(username, price)
        this[tickets].push(ticket)
        writeFile(this[tickets])
        return ticket
    }

    /**
     * create multiple ticket
     * @param {string} username
     * @param {number} price
     * @param {number} quantity
     * @return {Ticket} ticket array
     */
    bulkTicketCreate(username, price, quantity) {
        const result = []
        for (let i = 0; i < quantity; i++) {
            const ticket = this.createTicket(username, price)
            result.push(ticket)
        }
        writeFile(this[tickets])
        return result
    }

    /**
     * return all crated tickets
     * @returns return all tickets
     */
    find() {
        return this[tickets]
    }

    /**
     * this method is returning a specific ticket
     * @param {string} id 
     * @returns return a ticket 
     */
    findByID(id) {
        const foundTicket = this[tickets].find((ticket) => ticket.id === id)
        return foundTicket
    }

    /**
     * this method will help to find a user by ticket holder username
     * @param {string} username 
     * @returns founded ticket
     */
    findByUsername(username) {
        const foundTicket = this[tickets].filter((ticket) => ticket.ticketHolderName === username)
        return foundTicket
    }

    /**
     * this method will help to update ticket holder username   
     * @param {string} ticketID 
     * @return updated user
     */
    updateByID(ticketID, ticketBody) {
        const findedUser = this.findByID(ticketID)
        findedUser.ticketHolderName = ticketBody.username ?? findedUser.ticketHolderName
        findedUser.price = ticketBody.price ?? findedUser.price
        findedUser.updatedAt = new Date()
        writeFile(this[tickets])
        return findedUser
    }

    /**
     * this method is help you to update ticket by username
     * @param {string} ticketUsername 
     * @param {object} ticketBody 
     * @returns update user by user name
     */
    updateByUsername(ticketUsername, ticketBody) {
        const findedUser = this.findByUsername(ticketUsername)
        findedUser.map((user) => {
            user.ticketHolderName = ticketBody.username ?? user.ticketHolderName
            user.price = ticketBody.price ?? user.price
            user.updatedAt = new Date()
        })
        writeFile(this[tickets])

        return findedUser
    }

    /**
     * this method will delete the relevant ticket
     * @param {string} ticketID 
     * @returns deleted ticket
     */
    deleteByID(ticketID) {
        const index = this[tickets].findIndex(ticket => ticket.id === ticketID)
        if (index !== -1) {
            this[tickets].splice(index, 1)
            writeFile(this[tickets])
            return true
        } else {
            return false
        }
    }

    /**
     * this method is help for deleted ticket by his username
     * @param {string} username 
     * @returns deleted user
     */
    deleteByUsername(username) {
        const user = this.findByUsername(username)
        if (user === -1) {
            return false
        }
        this[tickets].splice(user, 1)
        writeFile(this[tickets])
        return true

    }

    /**
     * raffle draw winner
     * @param {number} wc how many ticket you want to make winners
     * @returns winners
     */
    raffleDraw(wc) {
        const indexes = new Array(wc)
        let index = 0
        while (index < wc) {
            let wIndex = Math.floor(Math.random() * this[tickets].length)
            if (!indexes.includes(wIndex)) {
                indexes[index++] = wIndex
            }
        }
        return indexes.map(t => this[tickets][t])
    }

}
const myNewDB = new myDB()
module.exports = myNewDB