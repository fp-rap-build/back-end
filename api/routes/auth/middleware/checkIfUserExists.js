const User = require('../../users/userModel')

const checkIfUserExists = async (req,res,next) => {
    
    const { email } = req.body

    try {

        // Try to find a user with that email
        let user = await User.findBy({ email })

        let userExists = user.length > 0

        if(userExists){
            return res.status(400).json({ message: "User with that email already exists" })
        }

        next()

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

module.exports = checkIfUserExists