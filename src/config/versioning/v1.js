const express = require('express') 
const { loginUser } = require('../../controllers/user.controller')
const api = express.Router()
const books = require('../../routes/book')
const users = require('../../routes/user')

api.get("/", (req, res) => res.status(200).json({
    status: 'success',
    message: 'Welcome to Academy API'
}))

api.use('/books', books)
api.use('/users', users)


module.exports = api