const express = require("express");
const {getUserDetail} = require("../controllers/dashboardController");

const router = express();

//Middleware
router.use(express.json());

//API
router.get('/',getUserDetail)

module.exports = router;