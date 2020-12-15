const express = require("express");
const router = express.Router();

//Controller
const { register, login, checkAuth } = require("../controllers/auth");
const { getPosts } = require("../controllers/posts");

//middleware 
const {auth, userCheck} = require('../middleware/auth');

//Auth
router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", auth, checkAuth);

//Post
router.get("/posts", auth, getPosts);

module.exports = router;