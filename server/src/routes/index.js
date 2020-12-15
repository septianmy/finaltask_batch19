const express = require("express");
const router = express.Router();

//Controller
const { register, login, checkAuth } = require("../controllers/auth");
const { getPosts, getPostDetail } = require("../controllers/posts");
const { getOrders, addOrder, getOrderById, getOfferById} = require("../controllers/orders");

//middleware 
const {auth, userCheck} = require('../middleware/auth');

//Auth
router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", auth, checkAuth);

//Post
router.get("/posts", auth, getPosts);
router.get("/post/:id", auth, getPostDetail);

//Order
router.get("/orders", auth, getOrders);
router.post("/order", auth, addOrder);
router.get("/my-order/:id", auth, getOrderById);
router.get("/my-offer/:id", auth, getOfferById);
module.exports = router;