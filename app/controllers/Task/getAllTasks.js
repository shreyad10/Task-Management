const Task = require("../../models/Task");

const getAllTasks = async function (req, res) {

    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
  
      const query = { owner: req.user.userId };
      
      if (req.query.title) {
        query.title = { $regex: req.query.title, $options: "i" }; 
      }
  
      if (req.query.status) {
        query.status = req.query.status;
      }
  
      const totalTasks = await Task.countDocuments(query);
      const tasks = await Task.find(query)
        .populate("projectId")
        .skip(skip)
        .limit(limit);
  
      return res.json({
        message: tasks.length ? "Tasks found!" : "No tasks found!",
        total: totalTasks,
        page,
        limit,
        tasks,
      });
      
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Something went wrong!" });
    }
  };
  

module.exports = { getAllTasks };
