
const { validationResult } = require("express-validator");
const Task = require("../../models/Task");

const deleteTask = async function (req, res) {
    try {
        const task = await Task.findById(req.params.id);
        if (!task || task.owner.toString() !== req.user.userId) {
            return res.status(404).json({ msg: 'Task not found' });
        }

        await task.remove();
        res.json({ msg: 'Task removed' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
}

module.exports = { deleteTask }