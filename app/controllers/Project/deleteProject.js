
const Project = require("../../models/Project");

const deleteProject = async function (req, res) {
    try {
        const project = await Project.findById(req.params.id);
        if (!project || project.owner.toString() !== req.user.userId) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        await project.remove();
        res.json({ msg: 'Project removed' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
}

module.exports = { deleteProject }