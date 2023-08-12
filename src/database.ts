import firebase from 'firebase/app';
import "firebase/firestore"

const config = {
    apiKey: "AIzaSyAvPOBE0W023TicPydyt_hqMqR3qP-HM-0",
    authDomain: "helpbuddy-62d1c.firebaseapp.com",
    projectId: "helpbuddy-62d1c",
    storageBucket: "helpbuddy-62d1c.appspot.com",
    messagingSenderId: "114674232273",
    appId: "1:114674232273:web:434411d269055de2bc8ef0",
    measurementId: "G-TBDT579Z77"
  }; 

  firebase.initializeApp(config);
  export default firebase.firestore();