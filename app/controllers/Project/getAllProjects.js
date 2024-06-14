const Project = require("../../models/Project");

const getAllProjects = async function (req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const totalProjects = await Project.countDocuments({ owner: req.user.userId });
        const projects = await Project.find({ owner: req.user.userId })
            .skip(skip)
            .limit(limit);

        res.json({
            total: totalProjects,
            page,
            limit,
            projects
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { getAllProjects }