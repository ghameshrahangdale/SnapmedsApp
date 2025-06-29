import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';


// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyC6SGr8lqMMEVMMC5qP3SjwlLx0Ijnh40k",
  authDomain: "snapmeds-app.firebaseapp.com",
  databaseURL: "https://snapmeds-app-default-rtdb.firebaseio.com",
  projectId: "snapmeds-app",
  storageBucket: "snapmeds-app.firebasestorage.app",
  messagingSenderId: "145929342075",
  appId: "1:145929342075:android:515e1028b0bba6a9c7e6de",
  measurementId: "G-C811S2KJC7"
};

// Initialize Firebase only if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { auth };