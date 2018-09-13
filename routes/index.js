const express = require('express');

const UserRoutes = require('../users/UserRoutes.js');
const PostRoutes = require('../posts/PostRoutes.js');

const router = express.Router();

router.use('/users', UserRoutes);
router.use('/posts', PostRoutes);

module.exports = router;
