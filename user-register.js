// user-registered.js

firebase.auth().onAuthStateChanged(user => {
    if (user) {
      const uid = user.uid;
      document.getElementById('user-name').innerText = user.displayName || 'User';
      document.getElementById('user-email').innerText = user.email;
  
      // Fetch user-specific Firestore data
      firebase.firestore().collection('users').doc(uid).get()
        .then(doc => {
          if (doc.exists) {
            console.log("User data:", doc.data());
            // You can display more fields like location, preferences, etc.
          } else {
            console.log("No additional user data found.");
          }
        })
        .catch(error => {
          console.error("Error fetching user data:", error.message);
        });
  
    } else {
      console.log("No user is logged in");
      window.location.href = "index.html"; // or login.html
    }
  });
  
  // Logout function
  document.getElementById('logout-btn').addEventListener('click', () => {
    logoutUser(); // Assumes this is defined in auth.js
  });
  