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
			res.status(201).json({ message: 'Post succesfully added.' });
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
	.delete(async (req, res, next) => {
		const { id } = req.params;
		try {
			const count = await postModel.deletePost(id);
			count
			//fix this section
			? res.status(200).json({ message: 'Successfully deleted post' })
			: next({ statusCode: 404 })
		} catch(err) {
			next(err);
		}
	})
	.put(async (req, res, next) => {
		const { id } = req.params;
		const post = req.body;
		try {
			const updatedUser = await postModel.updatePost(id, post)
			updatedUser
			//fix this section
			? res.status(200).json({ message: 'Updated!' })
			: next({ statusCode: 404 })
		} catch(err) {
			next(err)
		}
	})

module.exports = router