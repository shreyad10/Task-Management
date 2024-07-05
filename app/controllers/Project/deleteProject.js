const Project = require("../../models/Project");
const Task = require("../../models/Task");

const deleteProject = async function (req, res) {
  try {
    const project = await Project.findOneAndDelete({ _id: req.params.id });

    await Task.deleteMany({projectId: req.params.id})

    if (!project || project.owner.toString() !== req.user.userId) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.send({ message: "Project Removed", project });
  } catch (err) {
    res.status(500).json({ message: "Somwthing went wrong!", error: err.message });
  }
};

module.exports = { deleteProject };
