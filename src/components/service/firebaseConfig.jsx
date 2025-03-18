import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDB4g0BYSweELzCA8IPtjB1HvtbdIiniMk",
  authDomain: "ai-trip-planner-0912.firebaseapp.com",
  projectId: "ai-trip-planner-0912",
  storageBucket: "ai-trip-planner-0912.firebasestorage.app",
  messagingSenderId: "518867997047",
  appId: "1:518867997047:web:035b69f5311c6e037f9172",
  measurementId: "G-Y1EVQTC3T7",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
