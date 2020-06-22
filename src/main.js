import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import firebase from 'firebase/app';

// axios
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);

firebase.initializeApp({
	apiKey: 'AIzaSyCirrqun6JGckoUm6OF2PlMsEtYVB3OqsE',
	authDomain: 'vue-and-firease.firebaseapp.com',
	databaseURL: 'https://vue-and-firease.firebaseio.com',
	projectId: 'vue-and-firease',
	storageBucket: 'vue-and-firease.appspot.com',
	messagingSenderId: '639700433212',
	appId: '1:639700433212:web:770fa8b8b1b4132ff2c639',
});

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
