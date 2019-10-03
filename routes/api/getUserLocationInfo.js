const express = require('express');
const router = express.Router();
const User = require('../../models/User')

router.post('/', async(req,res) => {
    let user = await User.findById({_id: req.body.userId})
    if (user) {
        try {
            return res.status(200).json({userLocationSaved: user.locationSaved, locationDenied: user.locationDenied, userState: user.locationState, userTown: user.locationTown})
        }
        catch(error) {
        }
    }
})


module.exports = router;