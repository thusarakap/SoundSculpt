const firebaseConfig = {
    apiKey: "AIzaSyDZ4mxqDZXiGPzGb1LaNkeXSNZktREqG68",
    authDomain: "sound-sculpt-75037.firebaseapp.com",
    databaseURL: "https://sound-sculpt-75037-default-rtdb.firebaseio.com/", // replace <databaseName> with your actual database name
    projectId: "sound-sculpt-75037",
    storageBucket: "sound-sculpt-75037.appspot.com",
    messagingSenderId: "900313633981",
    appId: "1:900313633981:web:13770c0c514ac0747213d4",
    measurementId: "G-XJ4PXZY8FN"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();