document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const menuList = document.getElementById("menuList");
  const loginBtn = document.getElementById("loginBtn");
  const searchInput = document.getElementById("searchInput");
  const darkModeBtn = document.getElementById("darkModeBtn");
  const doaContainer = document.getElementById("doaContainer");

  let allDoa = [];
  let currentUser = null;

  // === TOGGLE MENU ===
  menuBtn.addEventListener("click", () => {
    menuList.classList.toggle("hidden");
    menuList.style.display = menuList.classList.contains("hidden") ? "none" : "block";
  });

  document.addEventListener("click", (e) => {
    if (!menuBtn.contains(e.target) && !menuList.contains(e.target)) {
      menuList.classList.add("hidden");
      menuList.style.display = "none";
    }
  });

  // === MODE GELAP ===
  darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
  });

  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }

  // === LOGIN GOOGLE (Firebase) ===
  loginBtn.addEventListener("click", () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(result => {
        currentUser = result.user;
        alert(`Login berhasil sebagai ${currentUser.displayName}`);
      })
      .catch(error => {
        console.error("Login error:", error);
        alert("Gagal login.");
      });
  });

  // === LOAD DOA ===
  fetch("doa.json")
    .then(res => res.json())
    .then(data => {
      allDoa = data;
      displayDoa(allDoa);
    });

  // === TAMPILKAN DOA ===
  function displayDoa(list) {
    doaContainer.innerHTML = "";
    list.forEach(doa => {
      const card = document.createElement("div");
      card.className = "doa";
      card.innerHTML = `
        <h3>${doa.judul}</h3>
        <p class="arab">${doa.arab}</p>
        <p><em>${doa.latin}</em></p>
        <p>${doa.arti}</p>
        <button class="favBtn">⭐ Simpan Favorit</button>
      `;
      card.querySelector(".favBtn").addEventListener("click", () => saveFavorite(doa));
      doaContainer.appendChild(card);
    });
  }

  // === CARI DOA ===
  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();
    localStorage.setItem("lastSearch", keyword);
    const filtered = allDoa.filter(d => d.judul.toLowerCase().includes(keyword));
    displayDoa(filtered);
  });

  if (localStorage.getItem("lastSearch")) {
    searchInput.value = localStorage.getItem("lastSearch");
    const filtered = allDoa.filter(d =>
      d.judul.toLowerCase().includes(searchInput.value.toLowerCase())
    );
    displayDoa(filtered);
  }

  // === SIMPAN FAVORIT ===
  function saveFavorite(doa) {
    let favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (!favs.some(d => d.judul === doa.judul)) {
      favs.push(doa);
      localStorage.setItem("favorites", JSON.stringify(favs));
      alert("Ditambahkan ke favorit!");
    } else {
      alert("Doa sudah ada di favorit.");
    }
  }
});
