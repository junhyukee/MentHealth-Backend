const express = require('express');
const userModel = require('./UserModel');

const router = express.Router();

router
	.route('/')
	.get(async (req, res, next) => {
		try {
			const users = await userModel.getUsers();
			res.status(200).json(users);
		} catch(err) {
			next(err);
		}
	})
	.post(async (req, res, next) => {
		const user = req.body;
		try {
			const add = await userModel.addUser(user);
			res.status(201).json({ message: 'User succesfully registered.' });
		} catch(err) {
			next(err);
		}
	})

router
	.route('/:username')
	.get(async (req, res, next) => {
		const { username } = req.params;
		try {
			const user = await userModel.getUser(username);
			user
			? res.status(200).json(user)
			: next({ statusCode: 404 })
		} catch(err) {
			next(err);
		}
	})

module.exports = router