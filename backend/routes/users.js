const express  = require('express')
const User = require('../models/userModel')
const router= express.Router()
const {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser,
    authenticateUser,
    unAuthenticateUser
    } = require('../controllers/userController')

// router.get('/', sessionChecker, async function(req, res, next) {
//     res.redirect('/account');
// });
    router.post('/authenticate', authenticateUser)
    router.delete('/authenticate', unAuthenticateUser)
module.exports = router