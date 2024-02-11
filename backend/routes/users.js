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

// router.get('/', sessionChecker, async function(req, res, next) {
//     res.redirect('/account');
// });

module.exports = router