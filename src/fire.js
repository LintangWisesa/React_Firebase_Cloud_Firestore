import firebase from 'firebase'
// change lines below with your own Firebase snippets!
var config = {
  apiKey: "1a2b3c4d5e6f7g8h9i0j",
  authDomain: "lintang.firebaseapp.com",
  databaseURL: "https://lintang.firebaseio.com",
  projectId: "lintang",
  storageBucket: "lintang.appspot.com",
  messagingSenderId: "1234567890"
};
const fire = firebase.initializeApp(config);
export default fire;