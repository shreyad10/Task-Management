const { createTask } = require("../controllers/Task/createTask")
const { deleteTask } = require("../controllers/Task/deleteTask")
const { getAllTasks } = require("../controllers/Task/getAllTasks")
const { getTaskById } = require("../controllers/Task/getTaskById")
const { getTaskByProject } = require("../controllers/Task/getTaskByProject")
const { updateTask } = require("../controllers/Task/updateTask")
const express = require('express');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post("/tasks", auth, createTask)

router.get("/tasks", auth, getAllTasks)

router.get("/tasks/:id", auth, getTaskById)

router.put("/tasks/:id", auth, updateTask)

router.delete("/tasks/:id", auth, deleteTask)

router.get("/projects/:projectId/tasks", auth, getTaskByProject)

module.exports = router;