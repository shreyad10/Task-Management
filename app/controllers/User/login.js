const User = require("../../models/User");
const bcrypt = require('bcryptjs');
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');

const login = async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
console.log(req.body)
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payload = { userId: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: "Login Successful!", token });

    } catch (err) {
        res.status(500).json({ message: 'Somwthing went wrong!' });
    }
}

module.exports = { login }