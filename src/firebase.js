import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage'
//import "firebase/auth";
var firebaseConfig = {
    apiKey: "AIzaSyDzYO27eKYTzcmd13pw19aFgcY8UI3eBRU",
    authDomain: "vue-almabrook2.firebaseapp.com",
    projectId: "vue-almabrook2",
    storageBucket: "vue-almabrook2.appspot.com",
    messagingSenderId: "87459127330",
    appId: "1:87459127330:web:442eeed703cfaad743aa7b"
  };
  // Initialize Firebase
 const fb =  firebase.initializeApp(firebaseConfig);
 const db = firebase.firestore();
 export {fb,db}