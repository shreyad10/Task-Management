const { validationResult } = require("express-validator");
const User = require("../../models/User");

const updateUserProfile = async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { user_name, email } = req.body;

    try {
        let user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user_name) user.user_name = user_name;
        if (email) user.email = email;

        await user.save();

        res.json({message: "Updated Successfully!", user});
    } catch (err) {
        res.status(500).json({ message: 'Somwthing went wrong!' });
    }
}

module.exports = { updateUserProfile }