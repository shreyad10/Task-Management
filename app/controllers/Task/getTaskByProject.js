
const Task = require("../../models/Task");
const Project = require("../../models/Project");

const getTaskByProject = async function (req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const project = await Project.findById(req.params.projectId);
    if (!project || project.owner.toString() !== req.user.userId) {
      return res.status(404).json({ message: "Project not found" });
    }

    const totaltasks = await Task.countDocuments({
      projectId: req.params.projectId,
    });
    const tasks = await Task.find({ projectId: req.params.projectId })
      .skip(skip)
      .limit(limit);

      return res.json({
        message: tasks.length ? "Task Found!": "No task found for this project!",
        total: totaltasks,
        page,
        limit,
        tasks,
      });
   
  } catch (err) {
    res.status(500).json({ message: "Somwthing went wrong!" });
  }
};

module.exports = { getTaskByProject };
