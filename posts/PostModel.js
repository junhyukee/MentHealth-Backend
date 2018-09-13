const db = require('../db/firebase.js');
const FieldValue = require('firebase-admin').firestore.FieldValue;

const textPostRef = db.collection('text_posts');

async function getTextPosts(){
	try {
		const snapshot = await textPostRef.get()
		const posts = [];
		snapshot.forEach((doc) => {
			posts.push(doc.data());
		})
		return posts;
	} catch(err){
		return err;
	}
}

async function getTextPost(id){
	try {
		const snapshot = await textPostRef.where('id', '==', Number(id)).get()
		const post = [];
		snapshot.forEach(doc => {
			post.push(doc.data());
		})
		return post[0]
	} catch(err){
		return err;
	}
}

async function addTextPost(post){
	const { id, content, title } = post;
	const timestamp = FieldValue.serverTimestamp()
	try {
		const newTextPost = await textPostRef.doc().set({
			id,
			content,
			title,
			timestamp
		})
		return newTextPost;
	} catch(err) {
		return err;
	}
}

async function updatePost(id, post){
	const { title, content } = post;
	try {
		const snapshot = await textPostRef.where('id', '==', Number(id)).get();
		let count = 0;
		const updater = await snapshot.forEach(async (doc) => {
			try {
				textPostRef.doc(doc.id).update({title, content})
				count++;
			} catch(err) {
				console.log(err)
			}
		})
		return count;
	} catch(err){
		return err;
	}
}

async function deletePost(id){
	try {
		const snapshot = await textPostRef.where('id', '==', Number(id)).get();
		let count = 0;
		const deleter = await snapshot.forEach(async (doc) => {
			try {
				doc.ref.delete()
				count ++
			} catch(err) {
				console.log(err)
			}
		})
		return count;
	} catch(err) {
		return err;
	}
}

module.exports = {
	getTextPosts,
	getTextPost,
	addTextPost,
	updatePost,
	deletePost,
}