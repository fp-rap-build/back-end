const Programs = require('../model')

const getAllPrograms = async (req, res, next) => {

    try {
        const allPrograms = await Programs.findAll()
        
        res.status(200).json({ programs: allPrograms })
    } catch (error) {
        res.status(500).json({ message: 'unable to get all programs' })
    }

};

const createProgram = async (req, res, next) => {
    try {
        
    } catch (error) {
        res.status(500).json({ message: 'internal server error' })
    }
  res.send('create program');
};
const getProgramById = async (req, res, next) => {
    try {
        
    } catch (error) {
        res.status(500).json({ message: 'internal server error' })
    }
  res.send('create program');
};
const updateProgramById = async (req, res, next) => {
    try {
        
    } catch (error) {
        res.status(500).json({ message: 'internal server error' })
    }
  res.send('create program');
};
const deleteProgramById = async (req, res, next) => {
    try {
        
    } catch (error) {
        res.status(500).json({ message: 'internal server error' })
    }
  res.send('create program');
};

module.exports = {
  getAllPrograms,
  createProgram,
  getProgramById,
  updateProgramById,
  deleteProgramById,
};
