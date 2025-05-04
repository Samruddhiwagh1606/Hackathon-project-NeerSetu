// Assuming user is logged in

firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // Get user UID
      const userId = user.uid;
  
      // Reference to Firestore collection
      const userRef = firebase.firestore().collection('users').doc(userId);
  
      // Storing user information
      userRef.set({
        name: user.displayName,
        email: user.email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }).then(() => {
        console.log('User data saved!');
      }).catch(error => {
        console.error('Error saving user data: ', error);
      });
    }
  });
  