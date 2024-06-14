const Task = require("../../models/Task");
const { isValidId } = require("../../utils/validator");

const getTaskById = async function (req, res) {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(404).json({ message: "Invalid projects ID" });
    }
    const task = await Task.findById(req.params.id);
    if (!task || task.owner.toString() !== req.user.userId) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Somwthing went wrong!" });
  }
};

module.exports = { getTaskById };
