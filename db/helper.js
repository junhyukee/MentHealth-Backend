const db = require('./firebase.js');
const FieldValue = require('firebase-admin').firestore.FieldValue;

const userRef = db.collection('users');
const textPostRef = db.collection('text_posts');

async function getUsers(){
	try {
		const snapshot = await userRef.get()
		const users = [];
		snapshot.forEach((doc) => {
			users.push(doc.data());
		})
		console.log(users)
	} catch(err){
		console.log(err);
	}
}

// getUsers();

async function getUser(username){
	try {
		const snapshot = await userRef.doc(username).get();
		const user = snapshot.data();
		console.log(user);
	} catch(err) {
		console.log(err);
	}
}

// getUser('jhk');

async function addUser(user){
	const { username, name, age } = user;
	const timestamp = FieldValue.serverTimestamp();
	try {
		const newUser = await userRef.doc(username).set({
			username,
			name,
			age,
			timestamp
		})
		console.log(newUser);
	} catch(err) {
		console.log(err)
	}
}

// test = {
// 	username: 'jhk',
// 	name: 'Jun',
// 	age: 21,
// }
// addUser(test);

async function getTextPosts(){
	try {
		const snapshot = await textPostRef.get()
		const posts = [];
		snapshot.forEach((doc) => {
			posts.push(doc.data());
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
			post.push(doc.data());
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
	getUsers,
	getUser,
	addUser,
	getTextPosts,
	getTextPost,
	addTextPost,
}