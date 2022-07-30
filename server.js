require('dotenv').config()
// const express = require('express')
const app = require('./app/app');

// const http = require('http');
const PORT = process.env.PORT || 3000;
// const server = http.createServer(app)

app.listen(PORT, () => {
    console.log(`Server is running on PORT:${PORT}`)
})
