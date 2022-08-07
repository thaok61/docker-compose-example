const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');

const { check, param, validationResult } = require('express-validator')

const Department = require('../../models/Department')
const User = require('../../models/User');
const { json } = require('express');
const { restart } = require('nodemon');

// @route    POST api/users
// @desc     Register user
// @access   Private

router.post(
    '/',
    [
        check('name', 'Name is required')
            .not()
            .isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password', 
            'Please enter a password with 6 or more characters'
        ).isLength({ min: 6}),
        check('role', 'Role is required')
            .not()
            .isEmpty(),
    ], 
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const {name, email, password, role, department } = req.body;
        try {
            // See if user exists
            let user = await User.findOne({ email: email });
            if(user) {
                res.status(400).json({ errors: [ {msg: 'User already exist'} ] });
            }

            user = new User({
                name,
                email,
                password,
                role,
                department
            })

            // Encrypt password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            return res.status(200).json({ message: "Register Successfully" })
        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server error')
        }
    }
);
// Get all user
router.post(
    '/get', 
    auth,
    async (req,res) => {
        const { keyword } = req.body
        if(req.user.role !="admin") return res.status(400).json({ message: "No Auth"})
        try {
            
            var users = []
            if (keyword) {
                const regex = new RegExp(keyword, 'i')
                users = await User.find({ name: {$regex: regex}})
                console.log(keyword);
            } else {
                users = await User.find()
            }
            return res.status(200).json(users);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// Update User
router.put(
    '/',
    [
        check('userId', 'Missing param')
            .not()
            .isEmpty()
    ],
    auth,
    async (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        if(req.user.role != "admin") return res.status(400).json({ message: "No Auth"})
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const {userId, name, email, role, department } = req.body;
        try {
            //Buid department object
            const userFields = {}
            if (name) userFields.name = name;
            if (email) userFields.email = email;
            if (role) userFields.role = role;
            if (department) userFields.department = department;
            // See if user exists
            let user = await User.findOne({ _id: userId });
            if(user) {
                user = await User.findOneAndUpdate(
                    { _id: userId }, 
                    { $set: userFields }, 
                    { new: true })
            }

            return res.status(200).json( {message : 'Edit successfully'});

        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server error')
        }
    }
);

// Delete User
router.delete(
    '/',
    [
        check('userId', 'Missing param')
            .not()
            .isEmpty()
    ], 
    auth,
    async (req,res) => {
        const { userId } = req.body;
        console.log(userId);
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        try {
            if(req.user.role != "admin") return res.status(400).json({ message: "No Auth"})
            let user = await User.findOne({ _id : userId });
            if (user) {
                User.deleteOne({ _id: userId }, function (err) {
                    if (err) return res.status(500).send('Server Error');
                  });
                return res.status(200).json( {message : 'Delete successfully'} );
            }
            res.status(400).json({ message: 'No user deleted'});
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);
module.exports = router;