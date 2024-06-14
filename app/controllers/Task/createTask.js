
const { validationResult } = require("express-validator");
const Task = require("../../models/Task");
const Project = require("../../models/Project");

const createTask = async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, status, dueDate, projectId, priority } = req.body;

    try {
        const project = await Project.findById(projectId);
        if (!project || project.owner.toString() !== req.user.userId) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const taskDueDate = new Date(dueDate);

        if (isNaN(taskDueDate.getTime())) {
            return res.status(400).json({ message: 'Invalid due date format' });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (taskDueDate < today) {
            return res.status(400).json({ message: 'Due date cannot be in the past' });
        }

        if (priority && !['low', 'medium', 'high'].includes(priority.toLowerCase())) {
            return res.status(400).json({ message: 'Invalid priority value' });
        }

        const task = new Task({
            title,
            description,
            status,
            dueDate: taskDueDate,
            projectId,
            owner: req.user.userId,
            priority: priority ? priority.toLowerCase() : 'medium' 
        });

        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong!', error: err.message });
    }
}

module.exports = {createTask }