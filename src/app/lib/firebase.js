import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/analytics';

export function loadFirebase() {
  try {
    const config = {
        apiKey: "*|REMOVED|*",
        authDomain: "nestin.io",
        databaseURL: "https://resource-share-cf186.firebaseio.com",
        projectId: "resource-share-cf186",
        storageBucket: "resource-share-cf186.appspot.com",
        messagingSenderId: "*|REMOVED|*",
        appId: "*|REMOVED|*",
        measurementId: "*|REMOVED|*"
    };
    firebase.initializeApp(config);
    firebase.analytics();
  } catch (error) {
    if (/already exists/.test(error.message)) {
      console.log(`Firebase didn't initialize correctly: ${error.message}`)
    }
  }

  return firebase;
}

export const getIdToken = async () => {
    let firebase = loadFirebase();
    return new Promise(resolve => {
        firebase
            .auth()
            .currentUser.getIdToken(true)
            .then(idToken => {
                resolve(idToken);
            })
            .catch(err => {
                resolve(null);
            });
    });
};