const User = require("../../models/User");

const getUserById = async function (req, res) {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
}

module.exports = { getUserById }