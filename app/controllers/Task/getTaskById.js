
const Task = require("../../models/Task");
const Project = require("../../models/Project");

const getTaskById = async function (req, res) {
    try {
        const task = await Task.findById(req.params.id);
        if (!task || task.owner.toString() !== req.user.userId) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {getTaskById }