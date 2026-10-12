
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "interviewiq-a304c.firebaseapp.com",
  projectId: "interviewiq-a304c",
  storageBucket: "interviewiq-a304c.firebasestorage.app",
  messagingSenderId: "510053344526",
  appId: "1:510053344526:web:ff66ee7482fea748e6235f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };