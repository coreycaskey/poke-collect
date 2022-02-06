import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getDatabase(firebaseApp);
const storage = getStorage(firebaseApp);

export { firebaseApp, auth, db, storage };
