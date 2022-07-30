const fs = require('fs/promises')
const path = require('path')

const p = path.resolve('db', 'database.json')

exports.readFile = async () => {
    const data = await fs.readFile(p)
    return JSON.parse(data)
}

exports.writeFile = async (data) => {
    await fs.writeFile(p, JSON.stringify(data))
}
