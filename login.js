// Import Firebase modular (v9.6.1) functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAY6qjVQdDZC6sP9RSvhQGfaa5c2wn_ST4",
  authDomain: "quranku-5d105.firebaseapp.com",
  projectId: "quranku-5d105",
  storageBucket: "quranku-5d105.appspot.com",
  messagingSenderId: "643861907201",
  appId: "1:643861907201:web:3a8d1e16e52e0114e4bd00"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login manual
document.getElementById("manualLoginBtn").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      alert("Login berhasil!");
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert("Login gagal: " + error.message);
    });
});

// Daftar manual
document.getElementById("registerBtn").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      alert("Pendaftaran berhasil! Silakan login.");
    })
    .catch((error) => {
      alert("Gagal mendaftar: " + error.message);
    });
});

// Login dengan Google
document.getElementById("googleLoginBtn").addEventListener("click", () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      alert(`Selamat datang, ${result.user.displayName}`);
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert("Login Google gagal: " + error.message);
    });
});
