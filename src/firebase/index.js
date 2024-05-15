import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAbvWD-wvSKEYBWxSq4NxVMt6Ro4C12epo",
  authDomain: "binance-depth.firebaseapp.com",
  projectId: "binance-depth",
  storageBucket: "binance-depth.appspot.com",
  messagingSenderId: "812933412142",
  appId: "1:812933412142:web:a6c2084a0c45f77181b6bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
