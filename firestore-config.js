// firestore-config.js

import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { firebaseConfig } from './firebase-config.js';  // Import your config

// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
const app = initializeApp(firebaseConfig); // Initialize Firebase app with your config

// Get Firestore instance
export const firestore = getFirestore(app); // Export firestore instance for use in other parts
