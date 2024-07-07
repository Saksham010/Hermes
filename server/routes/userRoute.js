const express = require("express");
const {registerUser,loginUser,resetPassword} = require("../controllers/userController");

const router = express();

//Middleware
router.use(express.json());

//API
router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/forgot-password',resetPassword);

module.exports = router;