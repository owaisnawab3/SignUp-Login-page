import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
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
auth.languageCode = 'en';
// //================//GOOGLE_AUTH//==================//
const provider = new GoogleAuthProvider()

const googleBtn = document.getElementById('google-btn')
googleBtn.addEventListener('click', function(){
  signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    console.log(user)
    window.location.href = "../home.html"
  
  }).catch((error) => {
    
    const errorCode = error.code;
    const errorMessage = error.message;
  
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  
  });
})

// Submit
const submit = document.getElementById("submit");
submit.addEventListener("click", function (event) {
  event.preventDefault();

  //inputs

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const saveEmail = localStorage.getItem('userEmail');
  const savePassword = localStorage.getItem('password')
  

  if(email === saveEmail && password === savePassword){
    alert("Login Sucessfully!");
    window.location.href = "home.html"
  }
else if(email !== saveEmail){
  alert('Your email is not matched!');
}
 else if(savePassword !== password){
  alert('Your Password is not matched!')
 }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      alert("Login Sucessfully!");
      window.location.href="home.html"
      confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0 }  // Origin is at the top of the screen
      });

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
});

