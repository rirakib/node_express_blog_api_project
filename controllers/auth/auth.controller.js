const User = require("../../models/user.js")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
require('dotenv').config()
const { body, validationResult } = require('express-validator');


exports.register = async (req, res) => {


    await body('name').notEmpty().withMessage('Name is required').run(req);
    await body('email').isEmail().withMessage('Invalid email').run(req);
    await body('password').isLength({ min: 4 }).withMessage('Password must be at least 6 characters').run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });


        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        return res.status(500).json({ message: 'Error registering user', error: error.message });
    }



}

exports.login = async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '3h' }
        );

        return res.status(200).json({ message:"Login successfull",token:token });

    } catch (error) {
        return res.status(500).json({ message: 'Error logging in', error: error.message });
    }
}