import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHK0juFXENLM6gqDItX5HIYUC0CJ_LbFo",
  authDomain: "project-cost-tracker-66b06.firebaseapp.com",
  projectId: "project-cost-tracker-66b06",
  storageBucket: "project-cost-tracker-66b06.firebasestorage.app",
  messagingSenderId: "836044820033",
  appId: "1:836044820033:web:220b64efd97e2e55f7c0c0",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
