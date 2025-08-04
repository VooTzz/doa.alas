document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const menuList = document.getElementById("menuList");
  const loginBtn = document.getElementById("loginBtn");
  const searchInput = document.getElementById("searchInput");
  const darkModeBtn = document.getElementById("darkModeBtn");
  const doaContainer = document.getElementById("doaContainer");
  const beritaContainer = document.getElementById("beritaContainer");

  let allData = []; // Bisa doa atau berita, tergantung halaman
  let currentUser = null;

  // === TOGGLE MENU ===
  menuBtn?.addEventListener("click", () => {
    menuList.classList.toggle("hidden");
    menuList.style.display = menuList.classList.contains("hidden") ? "none" : "block";
  });

  document.addEventListener("click", (e) => {
    if (!menuBtn?.contains(e.target) && !menuList?.contains(e.target)) {
      menuList?.classList.add("hidden");
      if (menuList) menuList.style.display = "none";
    }
  });

  // === MODE GELAP ===
  darkModeBtn?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
  });

  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }

  // === TOMBOL LOGIN ===
  loginBtn?.addEventListener("click", () => {
    window.location.href = "login.html";
  });

  // === HALAMAN DOA ===
  if (doaContainer) {
    fetch("doa.json")
      .then(res => res.json())
      .then(data => {
        allData = data;
        displayDoa(allData);
      });

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
  }

  // === HALAMAN BERITA ===
  if (beritaContainer) {
    fetch("berita.json")
      .then(res => res.json())
      .then(data => {
        allData = data;
        displayBerita(allData);
      });

    function displayBerita(list) {
      beritaContainer.innerHTML = "";
      list.forEach(berita => {
        const card = document.createElement("div");
        card.className = "doa"; // agar gaya sama
        card.innerHTML = `
          <h3>${berita.judul}</h3>
          <p>${berita.isi}</p>
        `;
        beritaContainer.appendChild(card);
      });
    }
  }

  // === PENCARIAN UMUM ===
  searchInput?.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();
    localStorage.setItem("lastSearch", keyword);

    if (doaContainer) {
      const filtered = allData.filter(d => d.judul.toLowerCase().includes(keyword));
      displayDoa(filtered);
    } else if (beritaContainer) {
      const filtered = allData.filter(b => b.judul.toLowerCase().includes(keyword));
      displayBerita(filtered);
    }
  });

  // === LOAD LAST SEARCH ===
  if (localStorage.getItem("lastSearch")) {
    searchInput.value = localStorage.getItem("lastSearch");
  }
});
