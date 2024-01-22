const express  = require('express')
const User = require('../models/userModel')
const router= express.Router()
const {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser,
    authenticateUser
    } = require('../controllers/userController')

router.get('/',getUsers)

router.get('/:id',getUser)

router.post('/',createUser)

router.post('/authenticate',authenticateUser)

router.delete('/:id',deleteUser)

router.patch('/:id',updateUser)

module.exports = router