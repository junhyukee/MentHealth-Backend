const db = require('../db/firebase.js');
const FieldValue = require('firebase-admin').firestore.FieldValue;

const userRef = db.collection('users');

async function getUsers(){
	try {
		const snapshot = await userRef.get()
		const users = [];
		snapshot.forEach((doc) => {
			users.push(doc.data());
		})
		return users;
	} catch(err){
		return err;
	}
}


// getUsers();

async function getUser(username){
	try {
		const snapshot = await userRef.doc(username).get();
		const user = snapshot.data();
		return user;
	} catch(err) {
		return err;
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
		return newUser;
	} catch(err) {
		return err;
	}
}

// test = {
// 	username: 'jhk',
// 	name: 'Jun',
// 	age: 21,
// }
// addUser(test);

module.exports = {
	getUsers,
	getUser,
	addUser,
}