import Firebase from 'firebase';
let config = {
   //apiKey: 'AIzaSyB48C6-WVgAMIvFo-PjX35yOuQn_GTurlI',
  // authDomain: 'sandar-89f26.firebaseapp.com',
  // databaseURL: 'https://sandar-89f26.firebaseio.com',
  // projectId: 'sandar-89f26',
  // storageBucket: 'sandar-89f26.appspot.com',
  // messagingSenderId: '421482275813',
  // appId: '1:421482275813:web:a84d005e4cbb24cc7c850c',
  // measurementId: 'G-ZKEPYR428M',
  // apiKey: 'AIzaSyBK_o0nSsKisqL6Deualw41iDYl6xGqrRI',
  apiKey: 'AIzaSyAH_RB5jSxzOR4879ZMnHazUrgcKGrHgPU',
  authDomain: 'musicapp-890ef.firebaseapp.com',
  //databaseURL: 'https://sandar-89f26.firebaseio.com',
  databaseURL: 'https://musicapp-890ef-default-rtdb.firebaseio.com/',
  projectId: 'musicapp-890ef',
  storageBucket: 'musicapp-890ef.appspot.com',
//   messagingSenderId: '421482275813',
  appId: '1:602536565162:android:5dbb95ecd5a95bb220b3d3',  
//   measurementId: 'G-ZKEPYR428M',
};

export const db = Firebase.initializeApp(config).database();
