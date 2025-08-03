const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      alert("Berhasil login sebagai: " + user.displayName);
      // simpan user info di localStorage atau tampilkan di UI
    })
    .catch(error => {
      console.error("Login gagal:", error.message);
      alert("Login gagal: " + error.message);
    });
});
