import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCCyG1GAq9AHhi93zpXaXgy-1cviHjlG_4",//current_key
    authDomain: "restaurant-booking-12345.firebaseapp.com",//project_id + ".firebaseapp.com"
    projectId: "restaurant-booking-4da9b", //project_id
    storageBucket: "restaurant-booking-4da9b.firebasestorage.appspot.com", //project_id + ".firebasestorage.googleapis.com"
    messagingSenderId: "402536857265", //project_number
    appId: "1:402536857265:android:af95e01841a7fa182fac90", //app_id
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { app, db };
