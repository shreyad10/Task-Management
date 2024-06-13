const Project = require("../../models/Project");

const getProjectById = async function (req, res) {
    try {
        const project = await Project.findById(req.params.id);
        if (!project || project.owner.toString() !== req.user.userId) {
            return res.status(404).json({ msg: 'Project not found' });
        }
        res.json(project);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
}

module.exports = { getProjectById }