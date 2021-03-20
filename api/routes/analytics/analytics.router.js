const express = require('express');
const Analytics = require('./analytics.model');
const restrictTo = require('../../middleware/restrictTo');

const router = express.Router()

router.get('/',restrictTo('admin', 'programManager'), async (req, res) => {
    try {
        const sumApprovedRequests = await Analytics.getRequestStatus();
        res.status(200).json({sumRequests: sumApprovedRequests});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: err.message});
    }
});

module.exports = router;