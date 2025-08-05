// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAY6qjVQdDZC6sP9RSvhQGfaa5c2wn_ST4",
  authDomain: "quranku-5d105.firebaseapp.com",
  projectId: "quranku-5d105",
  appId: "1:643861907201:web:3a8d1e16e52e0114e4bd00"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Login dengan Google
document.getElementById("googleLoginBtn").addEventListener("click", () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => {
      alert(`Selamat datang, ${result.user.displayName}`);
      window.location.href = "index.html";
    })
    .catch(error => alert("Gagal login Google: " + error.message));
});

// Login manual
document.getElementById("manualLoginBtn").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, pass)
    .then(userCredential => {
      alert("Login berhasil");
      window.location.href = "index.html";
    })
    .catch(error => alert("Login gagal: " + error.message));
});

// Daftar manual
document.getElementById("registerBtn").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  auth.createUserWithEmailAndPassword(email, pass)
    .then(userCredential => {
      alert("Akun berhasil dibuat, silakan login");
    })
    .catch(error => alert("Gagal daftar: " + error.message));
});
