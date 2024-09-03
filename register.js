import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARmVnE1_Zj6CxzBbTVDu8ZXoaKpeUP6q8",
  authDomain: "sign-up-and-login-in-page.firebaseapp.com",
  projectId: "sign-up-and-login-in-page",
  storageBucket: "sign-up-and-login-in-page.appspot.com",
  messagingSenderId: "989493385603",
  appId: "1:989493385603:web:6350271fa56be33f74beb6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "en";
// //================//GOOGLE_AUTH//==================//
const provider = new GoogleAuthProvider();

const googleBtn = document.getElementById("google-btn");
googleBtn.addEventListener("click", function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
      window.location.href = "../home.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
});


// Submit
const submit = document.getElementById("submit");
submit.addEventListener("click", function (event) {
  event.preventDefault();

  //inputs

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const userName = document.getElementById("username").value;

  if(!email){
    alert('Please Write your Email.')
  }

  let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if(!emailPattern.test(email)){
    alert('Oops! The email address format seems off. Please follow the format: user@gmail.com.')
    return false;
  }

  if(!userName){
    alert('Please enter a username!')
    return false;
  }else if(userName.length < 3){
    alert('The username must be more than 3 characters long.')
    return false;
  }

  //Save into LocalStorage

  localStorage.setItem("userName", userName);
  localStorage.setItem("userEmail", email);
  localStorage.setItem("password", password);

  //Redirect to Login Page

  // Window.location.href ="login.html"

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      alert("Sign-Up Sucessfully!");
      window.location.href = "./login.html";

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // alert(errorMessage);
      switch (errorCode) {
        case "auth/invalid-email":
          alert("The email address is not valid.");
          break;
        case "auth/user-not-found":
          alert("No user found with this email.");
          break;
        case "auth/wrong-password":
          alert("Incorrect password.");
          break;
        case "auth/weak-password":
          alert("The password is too weak.");
          break;
        case "auth/user-disabled":
          alert("The user account has been disabled by an administrator.");
          break;
        case 'auth/missing-password':
          alert('Please provide a password.');
          break;
        case 'auth/email-already-in-use':
          alert('The email address is already in use by another account.');
          break;
        default:
          alert("An unknown error occurred.");
      }
      // ..
    });
});

