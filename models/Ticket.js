const shortid = require('shortid');

class Ticket {
    /**
     * Ticket snap short
     * @param {string} username 
     * @param {number} price 
     */
    constructor(username, price) {
        this.id = shortid.generate()
        this.ticketHolderName = username
        this.price = price
        this.issusAt = new Date()
        this.updatedAt = new Date()

    }
}

module.exports = Ticket