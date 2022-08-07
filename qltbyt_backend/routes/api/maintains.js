const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const { check, validationResult } = require('express-validator')

const  Maintain = require('../../models/Maintain');
const  Device = require('../../models/Device');

// Add maintain
router.post(
    '/',
    [
        check('device', 'Device is required')
            .not()
            .isEmpty(),
        check('cost', 'Cost is required')
            .not()
            .isEmpty(),
        check('previousStatus', 'Cost is required')
            .not()
            .isEmpty(),
        check('startTime', 'Cost is required')
            .not()
            .isEmpty(),
    ],
    auth, 
    async (req,res) => {
        if(req.user.role == "admin") return res.status(400).json({message: "Admin wasn't allowed"})

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { device, cost, previousStatus, afterStatus, startTime, endTime } = req.body;
        try {
            let checkDevice = await Device.findOne({ _id: device });
            if(checkDevice == null) {
                res.status(400).json({ errors: [ {msg: 'Device does not exist'} ] });
            }
            maintain = new Maintain({
                device,
                cost,
                previousStatus,
                afterStatus,
                startTime,
                endTime
            })

            await maintain.save();
            return res.status(200).json( {message : 'Create Successfully'})

        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server error')
        }
    }
);
// Get all maintains
router.post(
    '/get',
    [
        check('device', 'device is required')
            .not()
            .isEmpty()
    ], 
    auth,
    async (req,res) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        
        const { device } = req.body
        try {
            
            let maintains = await Maintain.find({
                device: device
            })
            res.json(maintains);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// Update maintain
router.put(
    '/',
    [
        check('maintainId', 'Missing param')
            .not()
            .isEmpty(),
    ],
    auth,
    async (req,res) => {

        if(req.user.role == "admin") return res.status(400).json({message: "Admin wasn't allowed"})

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const {maintainId, cost, previousStatus, afterStatus, startTime, endTime } = req.body;
        try {
            const objectFields = {}
            if (cost) objectFields.cost = cost;
            if (previousStatus) objectFields.previousStatus = previousStatus;
            if (afterStatus) objectFields.afterStatus = afterStatus;
            if (startTime) objectFields.startTime = startTime;
            if (endTime) objectFields.endTime = endTime;

            // See if user exists
            console.log(maintainId);
            maintain = await Maintain.findOne({ _id: maintainId });
            if(maintain) {
                maintain = await Maintain.findOneAndUpdate(
                    { _id: maintainId }, 
                    { $set: objectFields }, 
                    { new: true })
            }

            await maintain.save();
            return res.status(200).json( {message : 'Edit successfully'})

        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server error')
        }
    }
);

// Delete maintain
router.delete(
    '/',
    [
        check('maintainId', 'Missing param')
            .not()
            .isEmpty(),
    ], 
    auth,
    async (req,res) => {
        if(req.user.role == "admin") return res.status(400).json({message: "Admin wasn't allowed"})

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { maintainId } = req.body
        
        try {
            const maintain = await Maintain.findOne({ _id : maintainId });
            if (maintain) {
                Maintain.deleteOne({ _id: maintainId }, function (err) {
                    if (err) return res.status(500).send('Server Error');
                  });
                return res.json( { message : 'Delete successfully' } );
            }
            res.json({message : 'Delete Fail'});
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;