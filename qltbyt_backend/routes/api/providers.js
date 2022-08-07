const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const { check, validationResult } = require('express-validator/check')

const  Provider = require('../../models/Provider');

// Add provider
router.post(
    '/',
    [
        check('name', 'Name is required')
            .not()
            .isEmpty(),
        check('address', 'Role is required')
            .not()
            .isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
    ],
    auth, 
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { name, address, email, mobile } = req.body;
        try {
            // See if user exists
            let provider = await Provider.findOne({
                $or: [
                    { name: name },
                    { email: email}
                ] 
            });
            if(provider) {
                res.status(400).json({ errors: [ { msg: 'Provider already exist' } ] });
            }

            provider = new Provider({
                name,
                address,
                email,
                mobile
            })

            await provider.save();
            return res.status(200).json( { message : 'Create Successfully' })

        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server error')
        }
    }
);
// Get all providers
router.post(
    '/get',
    auth,
    async (req,res) => {
        try {
            const {keyword} = req.body
            var providers = []
            if (keyword) {
                const regex = new RegExp(keyword, 'i')
                providers = await Provider.find({ name: {$regex: regex}})
            } else {
                providers = await Provider.find()
            }
            res.status(200).json(providers);
        } catch (error) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// Update provider
router.put(
    '/',
    [
        check('providerId', 'Missing param')
            .not()
            .isEmpty(),
    ],
    auth,
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const {providerId, name, address, email, mobile } = req.body;
        try {
            //Buid provider object
            // let provider = await Provider.findOne({
            //     $or: [
            //         { name: name },
            //         { email: email}
            //     ] 
            // });
            // if(provider) {
            //     res.status(400).json({ errors: [ {msg: 'Provider already exist'} ] });
            // }

            const objectFields = {}
            if (name) objectFields.name = name;
            if (address) objectFields.address = address;
            if (email) objectFields.email = email;
            if (mobile) objectFields.mobile = mobile;

            // See if user exists
            provider = await Provider.findOne({ _id: providerId });
            if(provider) {
                provider = await Provider.findOneAndUpdate(
                    { _id: providerId }, 
                    { $set: objectFields }, 
                    { new: true })
                return res.status(200).json( { message: "Edit Successfully" });
            }

            return res.status(400).json( {message : 'No Provider Id'})

        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server error')
        }
    }
);

// Delete provider
router.delete(
    '/',
    [
        check('providerId', 'Missing param')
            .not()
            .isEmpty(),
    ], 
    auth,
    async (req,res) => {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }

            const {providerId } = req.body;
            const provider = await Provider.findOne({_id : providerId});
            if (provider) {
                Provider.deleteOne({ _id: providerId }, function (err) {
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