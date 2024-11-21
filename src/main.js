import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkS-knyCegCjJ6jNMGWhlW0iKfTHTll1Y",
  authDomain: "cincinnatidrywall-17fea.firebaseapp.com",
  projectId: "cincinnatidrywall-17fea",
  storageBucket: "cincinnatidrywall-17fea.firebasestorage.app",
  messagingSenderId: "173735210581",
  appId: "1:173735210581:web:7eb3354b8f956dfb25eedc",
  measurementId: "G-W6NGLW17KF"
};

// Initialize Firebase
initializeApp(firebaseConfig);


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')


