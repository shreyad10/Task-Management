const Project = require("../../models/Project");

const deleteProject = async function (req, res) {
  try {
    const project = await Project.findOneAndDelete({ _id: req.params.id });

    if (!project || project.owner.toString() !== req.user.userId) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.send({ message: "Project Removed", project });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { deleteProject };
