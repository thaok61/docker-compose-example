const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const { check, validationResult } = require('express-validator/check')

const  Device = require('../../models/Device');

// Add device
router.post(
    '/',
    [
        check('name', 'Name is required')
            .not()
            .isEmpty(),
        check('model', 'Model is required')
            .not()
            .isEmpty(),
        check('serial', 'Serial is required')
            .not()
            .isEmpty(),
        check('country', 'Country is required')
            .not()
            .isEmpty(),
        check('status', 'Status is required')
            .not()
            .isEmpty(),
        check('price', 'Price is required')
            .not()
            .isEmpty(),
        check('provider', 'Provider is required')
            .not()
            .isEmpty(),
    ],
    auth, 
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const {name, model, serial, country, status, price, provider } = req.body;
        const user = req.user.id
        if(req.user.role == "admin") return res.status(400).json({message: "Admin wasn't allowed"})
        try {
            // See if user exists
            let device = await Device.findOne({ name: name });
            if(device) {
                res.status(400).json({ errors: [ {msg: 'device already exist'} ] });
            }

            device = new Device({
                name,
                model,
                serial,
                country,
                status,
                price,
                provider,
                user
            })

            await device.save();
            return res.status(200).json( {message : 'Create Successfully'})

        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server error')
        }
    }
);
// Get all devices
router.post(
    '/get', 
    auth,
    async (req,res) => {
        const { keyword } = req.body;
        try {
            var devices = []
            if (keyword) {
                const regex = new RegExp(keyword, 'i')
                devices = await Device.find({ name: {$regex: regex}})
            } else {
                devices = await Device.find()
            }
            return res.status(200).json(devices);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
    }
);

// Get devices by userId
router.post(
    '/getByUserId', 
    auth,
    async (req,res) => {
        const { keyword, userId } = req.body;
        try {
            var devices = []
            if (keyword) {
                const regex = new RegExp(keyword, 'i')
                devices = await Device.find(
                    {
                        $and:[
                            {
                                name: {$regex: regex}
                            }, 
                            {
                                user: userId
                            }
                        ] 
                    }
                )
            } else {
                devices = await Device.find({ user: userId })
            }
            return res.status(200).json(devices);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
    }
);

// Update device
router.put(
    '/',
    [
        check('deviceId', 'Missing param')
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

        const { deviceId, name, model, serial, country, status, price, provider } = req.body;
        
        try {
            //Buid device object
            const deviceFields = {}
            if (name) deviceFields.name = name;
            if (model) deviceFields.model = model;
            if (serial) deviceFields.serial = serial;
            if (country) deviceFields.country = country;
            if (status) deviceFields.status = status;
            if (price) deviceFields.price = price;
            if (provider) deviceFields.provider = provider;


            // See if user exists
            let device = await Device.findOne({ _id: deviceId });
            if(device) {
                device = await Device.findOneAndUpdate(
                    { _id: deviceId }, 
                    { $set: deviceFields }, 
                    { new: true })
                return res.status(200).json( {message : 'Edit successfully'})
            }
            return res.status(400).json({ message: 'No deviceId'})
            

        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server error')
        }
    }
);

// Delete device
router.delete(
    '/',
    [
        check('deviceId', 'Missing param')
            .not()
            .isEmpty(),
    ], 
    auth,
    async (req,res) => {
        const { deviceId } = req.body;

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        if(req.user.role == "admin") return res.status(400).json({message: "Admin wasn't allowed"})
        try {
            const device = await Device.findOne({ _id : deviceId});
            if (device) {
                Device.deleteOne({ _id: deviceId }, function (err) {
                    if (err) return res.status(500).send('Server Error');
                  });
                return res.status(200).json( {message : 'Delete successfully'} );
            }
            res.json({message : 'Delete Fail'});
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;