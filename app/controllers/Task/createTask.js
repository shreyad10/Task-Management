
const { validationResult } = require("express-validator");
const Task = require("../../models/Task");
const Project = require("../../models/Project");

const createTask = async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, status, dueDate, projectId } = req.body;

    try {
        const project = await Project.findById(projectId);
        if (!project || project.owner.toString() !== req.user.userId) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        const task = new Task({
            title,
            description,
            status,
            dueDate,
            projectId,
            owner: req.user.userId
        });

        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
}

module.exports = {createTask }