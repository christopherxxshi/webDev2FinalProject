import firebase from "firebase";

var config = {
    apiKey: "AIzaSyALlZwgixbiFY-HcZVqgJOLMe3YBFPyINY",
    authDomain: "project-20fdf.firebaseapp.com",
    databaseURL: "https://project-20fdf.firebaseio.com",
    projectId: "project-20fdf",
    storageBucket: "project-20fdf.appspot.com",
    messagingSenderId: "285495815112"
  };

  // var auth = firebase.initializeApp(config);

  if (!firebase.apps.length) {
    // firebase.initializeApp({});

    var auth = firebase.initializeApp(config);
 }

  export default auth;