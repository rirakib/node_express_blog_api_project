require('dotenv').config()
const User = require("../../models/user.js")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const { registerSchema, loginSchema } = require('../../validatorSchema/auth.schema.js');





exports.register = async (req, res) => {



    try {

        const { error } = registerSchema.validate(req.body, { abortEarly: false })

        if (error) {
            return res.status(400).json({ message: error.details.map(err => err.message) });
        }

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

        const {error} = loginSchema.validate(req.body, { abortEarly: false })

        if(error){
            return res.status(400).json({ message: error.details.map(err => err.message) });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email,isAdmin:user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '3h' }
        );

        return res.status(200).json({ message: "Login successfull", token: token });

    } catch (error) {
        return res.status(500).json({ message: 'Error logging in', error: error.message });
    }
}