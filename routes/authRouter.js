const express = require("express");
const { register, login, getUser } = require("../controllers/authController");
const authMiddleMan = require("../middlewares/authMiddleMan");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user", authMiddleMan, getUser);

module.exports = router;
