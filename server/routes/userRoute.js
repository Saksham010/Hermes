const express = require("express");
const {registerUser,loginUser,resetPassword} = require("../controllers/userController");
const {registerValidator,loginValidator} = require("../helpers/registerValidator");


const router = express();

//Middleware
router.use(express.json());

//API
router.post('/register',registerValidator,registerUser);
router.post('/login',loginValidator,loginUser);
router.post('/forgot-password',resetPassword);

module.exports = router;