import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage'
//import "firebase/auth";
var firebaseConfig = {
    
  };
  // Initialize Firebase
 const fb =  firebase.initializeApp(firebaseConfig);
 const db = firebase.firestore();
 export {fb,db}