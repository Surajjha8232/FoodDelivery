const express = require('express');
const router = express.Router();


router.use('/user', require('./user.js'));
const cors = require('cors');

router.use(cors());




module.exports = router;