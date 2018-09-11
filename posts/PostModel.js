const db = require('../db/firebase.js');
const FieldValue = require('firebase-admin').firestore.FieldValue;

const textPostRef = db.collection('text_posts');

async function getTextPosts(){
	try {
		const snapshot = await textPostRef.get()
		const posts = [];
		snapshot.forEach((doc) => {
			posts.push(doc.data().post);
		})
		console.log(posts)
	} catch(err){
		console.log(err);
	}
}

// getTextPosts();

async function getTextPost(id){
	try {
		const snapshot = await textPostRef.where('id', '==', id).get()
		const post = [];
		snapshot.forEach(doc => {
			post.push(doc.data().post);
		})
		console.log(post[0]);
	} catch(err){
		console.log(err);
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
		console.log(newTextPost);
	} catch(err) {
		console.log(err)
	}
}

// test = {
// 	id: 2,
// 	title: 'How I got rid of my chocolate allergy',
// 	content: `I just kept eating chocolate.`
// }

// addTextPost(test);

module.exports = {
	getTextPosts,
	getTextPost,
	addTextPost,
}