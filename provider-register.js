// provider-register.js

// Register provider function
function registerProvider() {
    const name = document.getElementById("provider-name").value;
    const org = document.getElementById("provider-org").value;
    const location = document.getElementById("provider-location").value;
    const age = document.getElementById("provider-age").value;
    const experience = document.getElementById("provider-experience").value;
    const email = document.getElementById("provider-email").value;
    const password = document.getElementById("provider-password").value;
    const confirmPassword = document.getElementById("provider-confirm-password").value;
  
    // Validate form fields
    if (!name || !org || !location || !age || !experience || !email || !password || !confirmPassword) {
      alert("Please fill in all the fields.");
      return;
    }
  
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
  
    // Create a new user with Firebase Authentication
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
  
        // Now, store the provider's additional information in Firestore
        const providerData = {
          name: name,
          organization: org,
          location: location,
          age: age,
          experience: experience,
          email: email,
          userId: user.uid, // Store Firebase user ID
          role: "provider" // You can also define a role for the user
        };
  
        // Save this data to Firestore under 'providers' collection
        firebase.firestore().collection('providers').doc(user.uid).set(providerData)
          .then(() => {
            alert("Provider account created successfully!");
            window.location.href = "provider-dashboard.html"; // Redirect to provider dashboard or another page
          })
          .catch(error => {
            console.error("Error adding document: ", error);
            alert("Error saving provider data.");
          });
  
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }
  