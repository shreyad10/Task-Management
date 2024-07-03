const express = require('express');
const auth = require('../middlewares/auth');
const { register } = require('../controllers/User/register');
const { login } = require('../controllers/User/login');
const { getUserById } = require('../controllers/User/getUser');
const { updateUserProfile } = require('../controllers/User/updateUser');
const router = express.Router();

router.post("/users/register",  register)

router.post("/users/login", login)

router.get("/users/me", auth, getUserById)

router.put("/users/me", auth, updateUserProfile)


module.exports = router;