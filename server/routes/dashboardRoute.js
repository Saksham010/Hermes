const express = require("express");
const {getUserDetail,createAPIKey,fetchAPIDetail} = require("../controllers/dashboardController");
const {authMiddleware} = require('../middlewares/verifyTokenMiddleware');
const {rateLimitMiddleware} = require("../middlewares/rateLimiter");

const router = express();

//Middleware
router.use(express.json());

//API
router.get('/',authMiddleware,rateLimitMiddleware,getUserDetail);
router.get('/fetch-api-detail',authMiddleware,rateLimitMiddleware,fetchAPIDetail); // Fetch api key details
router.post('/create-api-key',authMiddleware,rateLimitMiddleware,createAPIKey);    // Create a new api key

module.exports = router;