
const Task = require("../../models/Task");

const getAllTasks = async function (req, res) {

    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const totalTasks = await Task.countDocuments({ owner: req.user.userId });
        const tasks = await Task.find({ owner: req.user.userId })
            .skip(skip)
            .limit(limit);

        res.json({
            total: totalTasks,
            page,
            limit,
            tasks
        });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
}

module.exports = { getAllTasks }