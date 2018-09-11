const express = require('express');

const UserRoutes = require('../users/UserRoutes.js');
const PostRoutes = require('../posts/PostRoutes.js');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;