
const { validationResult } = require("express-validator");
const Task = require("../../models/Task");

const updateTask = async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, status, dueDate } = req.body;

    try {
        let task = await Task.findById(req.params.id);
        if (!task || task.owner.toString() !== req.user.userId) {
            return res.status(404).json({ msg: 'Task not found' });
        }

        if (title) task.title = title;
        if (description) task.description = description;
        if (status) task.status = status;
        if (dueDate) task.dueDate = dueDate;

        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
}

module.exports = { updateTask }