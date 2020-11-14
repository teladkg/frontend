import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


var firebaseConfig = {
  apiKey: "AIzaSyBSeoTOOxLkWRCOUuqklQRtsJi7_7Ji69g",
  authDomain: "telad-2020.firebaseapp.com",
  databaseURL: "https://telad-2020.firebaseio.com",
  projectId: "telad-2020",
  storageBucket: "telad-2020.appspot.com",
  messagingSenderId: "298227151054",
  appId: "1:298227151054:web:b6db6c9f4bd490f689e09f",
  measurementId: "G-KJJ3D3Y6P9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;