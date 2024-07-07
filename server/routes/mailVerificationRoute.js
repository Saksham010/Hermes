const express = require('express');
const {emailVerification} = require('../controllers/userController');

const router = express();
router.use(express.json());

router.use('/mail-verification',emailVerification);

module.exports = router;
