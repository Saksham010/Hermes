const express = require("express");
const {getUserDetail,createAPIKey,fetchAPIDetail} = require("../controllers/dashboardController");
const {authMiddleware} = require('../middlewares/verifyTokenMiddleware');

const router = express();

//Middleware
router.use(express.json());

//API
router.get('/',authMiddleware,getUserDetail);
router.get('/fetch-api-detail',authMiddleware,fetchAPIDetail); // Fetch api key details
router.post('/create-api-key',authMiddleware,createAPIKey);    // Create a new api key

module.exports = router;