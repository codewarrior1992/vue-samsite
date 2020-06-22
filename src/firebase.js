import { initializeApp } from 'firebase';

const app = initializeApp({
	apiKey: 'AIzaSyAjcgNosWgp60JDhYdF912a7kg1jTH4iT0',
	authDomain: 'node-multer.firebaseapp.com',
	databaseURL: 'https://node-multer.firebaseio.com',
	projectId: 'node-multer',
	storageBucket: 'node-multer.appspot.com',
	messagingSenderId: '908579566306',
});

export const db = app.database();
export const productsRef = db.ref('Products');
