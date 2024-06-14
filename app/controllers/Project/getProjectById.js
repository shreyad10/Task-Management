const Project = require("../../models/Project");
const { isValidId } = require("../../utils/validator");

const getProjectById = async function (req, res) {
    try {
        if(!isValidId(req.params.id)){
            return res.status(404).json({ message: 'Invalid projects ID' });
        }
        const project = await Project.findById(req.params.id).populate("owner");
        if (!project || project.owner._id.toString() !== req.user.userId) {
            return res.status(404).json({ message: 'Not authorised to access this project' });
        }
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: 'Somwthing went wrong!', error: err.message });
    }
}

module.exports = { getProjectById }