import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";  // Importing necessary auth functions
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";  // Importing Firestore functions

// Initialize Firebase Auth and Firestore from firebase-config.js
import { auth } from "./firebase-config";
const db = getFirestore();  // Initialize Firestore

// Function to handle user registration (Sign Up)
function registerUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User registered:", user);
      // Save additional data to Firestore here
      saveUserToFirestore(user);
    })
    .catch((error) => {
      console.error("Error signing up:", error.message);
    });
}

// Function to handle user login
function loginUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User logged in:", user);
      // Redirect or update the UI based on logged-in user
      window.location.href = "user-registered.html";
    })
    .catch((error) => {
      console.error("Error logging in:", error.message);
    });
}

// Function to handle user logout
function logoutUser() {
  signOut(auth)
    .then(() => {
      console.log("User logged out");
      window.location.href = "index.html";  // Redirect to home page after logout
    })
    .catch((error) => {
      console.error("Error logging out:", error.message);
    });
}

// Function to save user data to Firestore after registration
function saveUserToFirestore(user) {
  const userRef = doc(db, "users", user.uid);  // Reference to Firestore 'users' collection
  setDoc(userRef, {
    email: user.email,
    name: user.displayName || "Anonymous",  // Default name if not set
    createdAt: serverTimestamp()  // Adds server timestamp
  })
  .then(() => {
    console.log("User data saved to Firestore");
  })
  .catch((error) => {
    console.error("Error saving user data:", error.message);
  });
}
