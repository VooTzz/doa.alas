// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID"
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
