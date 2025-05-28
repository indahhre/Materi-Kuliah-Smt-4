import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAeY_yfEN_0b_iU8eHL6akBPefDCeqrV2k",//current_key
    authDomain: "restaurant-booking-4c2b5.firebaseapp.com",//project_id + ".firebaseapp.com"
    projectId: "restaurant-booking-4c2b5", //project_id
    storageBucket: "restaurant-booking-4c2b5.firebasestorage.appspot.com", //project_id + ".firebasestorage.googleapis.com"
    messagingSenderId: "666744292476", //project_number
    appId: "1:666744292476:android:eddb0770e878a5a42835f9", //app_id
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { app, db };
