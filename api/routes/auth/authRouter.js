const express = require("express");

const router = express.Router()

router.post('/login', (req,res,next) => {
    res.send('login')
})

router.post('/register', (req,res,next) => {
    res.send('register')
})

module.exports = router