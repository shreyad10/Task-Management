const { validationResult } = require("express-validator");
const Project = require("../../models/Project");

const updateProject = async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, description } = req.body;

    try {
        let project = await Project.findById(req.params.id).populate("owner");

        if (!project || project.owner.id.toString() !== req.user.userId) {
            return res.status(404).json({ message: 'Project not found' });
        }

        if (name) project.name = name;
        if (description) project.description = description;

        await project.save();
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: 'Somwthing went wrong!' });
    }
}

module.exports = { updateProject }