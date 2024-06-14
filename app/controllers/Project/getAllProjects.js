const Project = require("../../models/Project");

const getAllProjects = async function (req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const nameFilter = req.query.name ? { name: { $regex: req.query.name, $options: 'i' } } : {};
  
    try {
      const query = {
        owner: req.user.userId,
        ...nameFilter,
      };
  
      const totalProjects = await Project.countDocuments(query);
      const projects = await Project.find(query)
        .populate("owner")
        .skip(skip)
        .limit(limit);
  
      return res.json({
        message: projects.length ? "Projects found!" : "No Project found!",
        total: totalProjects,
        page,
        limit,
        projects,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Something went wrong!" });
    }
  };
  
  
module.exports = { getAllProjects };
