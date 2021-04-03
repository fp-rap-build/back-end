const Programs = require('../model')

const validateProgramId = async (req,res,next) => {

    const { id } = req.params

    try {
        const program = await Programs.findById(id)    

        if(program.length !== 0) return next()

        res.status(404).json({ message: `Unable to find program with id of ${id}` })
    } catch (error) {
        res.status(500).json({ message: "unable to validate program id" })
    }
}

module.exports = {
    validateProgramId
}