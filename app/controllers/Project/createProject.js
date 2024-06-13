const Project = require("../../models/Project");
const { validationResult } = require("express-validator");

const createProject = async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, description } = req.body;

    try {
        const project = new Project({
            name,
            description,
            owner: req.user.userId
        });

        await project.save();
        res.status(201).json(project);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
}

module.exports = { createProject }