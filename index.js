const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const settings= {
	timestampsInSnapshots: true
}

db.settings(settings);

// const docRef = db.collection('users').doc('admin');

// const setJhk = docRef.set({
// 	username: 'jhk',
// 	name: 'Jun'
// })

// db.collection('users').get()
// 	.then((snapshot) => {
// 		snapshot.forEach((doc) => {
// 			console.log(doc.id, '=>', doc.data());
// 		});
// 	})
// 	.catch(err => {
// 		console.log(err)
// 	});