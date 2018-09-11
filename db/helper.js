const db = require('./firebase.js');
const FieldValue = require('firebase-admin').firestore.FieldValue;

const userRef = db.collection('users');
const textPostRef = db.collection('text_posts');

async function getUsers(){
	try {
		const snapshot = await userRef.get()
		const users = [];
		snapshot.forEach((doc) => {
			users.push(doc.data().user);
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
		const user = snapshot.data().user;
		console.log(user);
	} catch(err) {
		console.log(err);
	}
}

// getUser('jhk');

async function addUser(user){
	try {
		const newUser = await userRef.doc(user.username).set({
			user
		})
		console.log(newUser);
	} catch(err) {
		console.log(err)
	}
}

// test = {
// 	username: 'KoreanDonkeyKong',
// 	name: 'Doseon',
// 	age: 24,
// 	timestamp: FieldValue.serverTimestamp()
// }
// addUser(test);

async function addTextPost(post){
	try {
		const newTextPost = await textPostRef.doc().set({
			post
		})
		console.log(newTextPost);
	} catch(err) {
		console.log(err)
	}
}

// test = {
// 	title: 'How do you overcome your fears?',
// 	content: `I'm not too sure myself.`,
// 	timestamp: FieldValue.serverTimestamp()
// }

// addTextPost(test);

module.exports = {
	getUsers,
	getUser,
	addUser,
	addTextPost
}