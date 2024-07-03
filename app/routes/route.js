const express = require("express");
const auth = require("../middlewares/auth");
const { register } = require("../controllers/User/register");
const { login } = require("../controllers/User/login");
const router = new express.Router();
const { check, validationResult } = require('express-validator');
const { getUserById } = require("../controllers/User/getUser");
const { updateUserProfile } = require("../controllers/User/updateUser");
const { createProject } = require("../controllers/Project/createProject");
const { getAllProjects } = require("../controllers/Project/getAllProjects");
const { getProjectById } = require("../controllers/Project/getProjectById");
const { updateProject } = require("../controllers/Project/updateProject");
const { deleteProject } = require("../controllers/Project/deleteProject");
const { createTask } = require("../controllers/Task/createTask");
const { getAllTasks } = require("../controllers/Task/getAllTasks");
const { getTaskById } = require("../controllers/Task/getTaskById");
const { updateTask } = require("../controllers/Task/updateTask");
const { deleteTask } = require("../controllers/Task/deleteTask");
const { getTaskByProject } = require("../controllers/Task/getTaskByProject");

/**
 * User Routes
 */
router.post("/users/register", [
    check('user_name', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
], register)

router.post("/users/login", [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], login)

router.get("/users/me", auth, getUserById)

router.put("/users/me", auth, [
    check('user_name', 'Username is required').optional().not().isEmpty(),
    check('email', 'Please include a valid email').optional().not().isEmail()
], updateUserProfile)

/**
 * Project Routes
 */
router.post("/projects", auth, [
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty()
], createProject)

router.get("/projects", auth, getAllProjects)

router.get("/projects/:id", auth, getProjectById)

router.put("/projects/:id", auth, [check('name', 'Name is required').not().isEmpty()], updateProject)

router.delete("/projects/:id", auth, deleteProject)

/**
 * Task Routes
 */
router.post("/tasks", [
    check('title', 'Title is required').not().isEmpty(),
    check('projectId', 'Project ID is required').not().isEmpty(),
    check('dueDate', 'Due Date is required').not().isEmpty()
],auth,  createTask)

router.get("/tasks",auth, getAllTasks)

router.get("/tasks/:id",  getTaskById)

router.put("/tasks/:id", [check('title', 'Title is required').optional().not().isEmpty(),
check('status', 'Status must be one of: to-do, in-progress, done').optional().isIn(['to-do', 'in-progress', 'done'])], auth, updateTask)

router.delete("/tasks/:id", auth, deleteTask)

router.get("/projects/:projectId/tasks", auth, getTaskByProject)

module.exports = router;
