const express = require('express');
const postModel = require('./PostModel');

const router = express.Router();

router
	.route('/')
	.get(async (req, res, next) => {
		try {
			const posts = await postModel.getTextPosts();
			res.status(200).json(posts);
		} catch(err) {
			next(err);
		}
	})
	.post(async (req, res, next) => {
		const post = req.body;
		try {
			const add = await postModel.addTextPost(post);
			res.status(201).json({ message: 'User succesfully registered.' });
		} catch(err) {
			next(err);
		}
	})

router
	.route('/:id')
	.get(async (req, res, next) => {
		const { id } = req.params;
		try {
			const post = await postModel.getTextPost(id);
			post
			? res.status(200).json(post)
			: next({ statusCode: 404 })
		} catch(err) {
			next(err);
		}
	})

module.exports = router