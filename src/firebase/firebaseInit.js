import firebase from 'firebase/app';
import 'firebase/firestore';

// Config from firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAhSy3RW9qK88VTfntTKfO-Kj8N0ZoXhdI',
  authDomain: 'vue-blog-b3b1e.firebaseapp.com',
  projectId: 'vue-blog-b3b1e',
  storageBucket: 'vue-blog-b3b1e.appspot.com',
  messagingSenderId: '723417838181',
  appId: '1:723417838181:web:2b53bb6fdde70658848c8c',
  measurementId: 'G-Q26J4K128J'
};

// set config for firebase
const fireabseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default fireabseApp.firestore(); // Fix use wrong params
