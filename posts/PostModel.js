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

// getTextPosts();

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

// getTextPost(2);

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

// test = {
// 	id: 2,
// 	title: 'How I got rid of my chocolate allergy',
// 	content: `I just kept eating chocolate.`
// }

// addTextPost(test);

async function updatePost(id, post){
	const { title, content } = post;
	try {
		const snapshot = await textPostRef.where('id', '==', Number(id)).get();
		snapshot.forEach((doc) => {
			textPostRef.doc(doc.id).update({title, content});
		})
		return true;
	} catch(err){
		return err;
	}
}

async function deletePost(id){
	try {
		const snapshot = await textPostRef.where('id', '==', Number(id)).get();
		snapshot.forEach((doc) => {
			doc.ref.delete().then(() => {
				console.log('deleted')
			}).catch(err => {
				console.log(err);
			})
		})
		//adjust this so that a 404 can come out, currently always returns true
		return true;
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