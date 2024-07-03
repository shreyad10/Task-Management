const express = require('express');
const { createProject } = require('../controllers/Project/createProject');
const auth = require('../middlewares/auth');
const { getAllProjects } = require('../controllers/Project/getAllProjects');
const { getProjectById } = require('../controllers/Project/getProjectById');
const { updateProject } = require('../controllers/Project/updateProject');
const { deleteProject } = require('../controllers/Project/deleteProject');

const router = express.Router();

router.post('/projects', auth, createProject);
router.get("/projects", auth, getAllProjects)

router.get("/projects/:id", auth, getProjectById)

router.put("/projects/:id", auth, updateProject)

router.delete("/projects/:id", auth, deleteProject)


module.exports = router;
