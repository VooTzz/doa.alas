document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");

  loginBtn.addEventListener("click", () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        console.log("Berhasil login:", user.displayName);
        alert(`Halo, ${user.displayName}`);
        // Bisa tampilkan nama/foto atau simpan ke localStorage
      })
      .catch((error) => {
        console.error("Login gagal:", error.message);
        alert("Login gagal: " + error.message);
      });
  });
});
