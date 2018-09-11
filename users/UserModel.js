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

async function updateUser(username, user){
	const { name, age } = user;
	try {
		const update = await userRef.doc(username).update({
			name,
			age,
		});
		return update;
	} catch(err){
		return {error: 'not found'};
	}
}

async function deleteUser(username){
	try {
		const snapshot = await userRef.where('username', '==', username.toString()).get();
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
	getUsers,
	getUser,
	addUser,
	deleteUser,
	updateUser
}