const express = require("express");
const router = express.Router()
const User = require('../users/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

router.post('/login', (req,res,next) => {
    res.send('login')
})

router.post('/register', async (req,res,next) => {

    let payload = req.body

    // Users can't give themselves a role of admin or program manager

    if(payload['role'] == 'admin' || payload['role'] == 'programManager'){
        payload['role'] = undefined
    }

    try {

        const user = await User.create(payload)

        // Hide password

        user[0]['password'] = undefined

        // Generate a token

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })

        res.status(200).json({
            status: 'success',
            token,
            user: user[0]
        })

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = router