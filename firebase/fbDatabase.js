import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { firebaseConfig } from './fbConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
