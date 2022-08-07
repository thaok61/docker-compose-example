const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const { check, validationResult } = require('express-validator/check')

const  Department = require('../../models/Department');

// Add Department
router.post(
    '/',
    [
        check('name', 'Name is required')
            .not()
            .isEmpty(),
        check('address', 'Role is required')
            .not()
            .isEmpty(),
    ],
    auth, 
    async (req,res) => {
        if (req.user.role == "user") return res.status(400).json({message: "User wasnt allowed"})

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const {name, address } = req.body;
        try {
            // See if user exists
            let department = await Department.findOne({ name: name });
            if(department) {
                res.status(400).json({ errors: [ {msg: 'Department already exist'} ] });
            }

            department = new Department({
                name,
                address,
            })

            await department.save();
            return res.status(200).json( {message : 'Create Successfully'})

        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server error')
        }
    }
);
// Get all departments
router.post(
    '/get', 
    auth,
    async (req,res) => {
        const { keyword } = req.body;
        if (req.user.role == "user") return res.status(400).json({message: "User wasnt allowed"})
        try {
            var departments = []
            if (keyword) {
                const regex = new RegExp(keyword, 'i')
                departments = await Department.find({ name: {$regex: regex}})
            } else {
                departments = await Department.find()
            }
            res.status(200).json(departments);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// Update Department
router.put(
    '/',
    [
        check('departmentId', 'Missing param')
            .not()
            .isEmpty(),
    ],
    auth,
    async (req,res) => {
        if (req.user.role == "user") return res.status(400).json({message: "User wasnt allowed"})

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const {departmentId, name, address } = req.body;
        try {
            //Buid department object
            const departmentFields = {}
            if (name) departmentFields.name = name;
            if (address) departmentFields.address = address;

            // See if user exists
            let department = await Department.findOne({ _id: departmentId });
            console.log(department);
            if(department) {
                department = await Department.findOneAndUpdate(
                    { _id: departmentId }, 
                    { $set: departmentFields }, 
                    { new: true })
                return res.status(200).json( { message : 'Edit Successfully'})
            }

            return res.status(400).json( {message : 'No Department ID'});

        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server error')
        }
    }
);

// Delete Department
router.delete(
    '/',
    [
        check('departmentId', 'Missing param')
            .not()
            .isEmpty(),
    ], 
    auth,
    async (req,res) => {

        const { departmentId } = req.body

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        if (req.user.role == "user") return res.status(400).json({message: "User wasnt allowed"});
        try {
            const departments = await Department.findOne({_id : departmentId });
            if (departments) {
                Department.deleteOne({ _id: departmentId }, function (err) {
                    if (err) return res.status(500).send('Server Error');
                  });
                return res.json( {message : 'Delete successfully'} );
            }
            res.json({message : 'Delete Fail'});
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;