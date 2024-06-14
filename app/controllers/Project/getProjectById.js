const Project = require("../../models/Project");

const getProjectById = async function (req, res) {
    try {
        const project = await Project.findById(req.params.id);
        if (!project || project.owner.toString() !== req.user.userId) {
            return res.status(404).json({ message: 'Not authorised to access this project' });
        }
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

module.exports = { getProjectById }