const express = require('express');
const Analytics = require('./analytics.model');
const restrictTo = require('../../middleware/restrictTo');

const router = express.Router()

router.get('/',restrictTo('admin', 'programManager'), async (req, res) => {
    try {
        const sumPeopleServed = await Analytics.getNumServed("requestStatus");
        const sumFamiliesServed = await Analytics.getNumServed("familySize");
        res.status(200).json({sumPeopleServed: sumPeopleServed, sumFamiliesServed: sumFamiliesServed });
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
});

module.exports = router;