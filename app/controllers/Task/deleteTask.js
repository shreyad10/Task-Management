
const { validationResult } = require("express-validator");
const Task = require("../../models/Task");

const deleteTask = async function (req, res) {
    try {
        const task = await Task.findById(req.params.id);
        if (!task || task.owner.toString() !== req.user.userId) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await task.deleteOne();
        res.json({ message: 'Task removed' });
    } catch (err) {
        console.log("ERROR: ", err)
        res.status(500).json({ message: 'Somwthing went wrong!' });
    }
}

module.exports = { deleteTask }