
const { validationResult } = require("express-validator");
const Task = require("../../models/Task");
const Project = require("../../models/Project");

const getTaskByProject = async function (req, res) {
    try {
        const project = await Project.findById(req.params.projectId);
        if (!project || project.owner.toString() !== req.user.userId) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        const tasks = await Task.find({ projectId: req.params.projectId });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
}

module.exports = { getTaskByProject }