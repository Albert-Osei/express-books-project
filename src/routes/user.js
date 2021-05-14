const express = require('express')
const router = express.Router()
const { loginUser, createUser } = require('../controllers/user.controller')
const { validateUserSignup, validateUserLogin } = require('../validators/user')

router.post('/login', validateUserLogin, loginUser)
router.post('/signup', validateUserSignup, createUser)

module.exports = router 