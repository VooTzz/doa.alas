document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const menuList = document.getElementById("menuList");
  const loginBtn = document.getElementById("loginBtn");
  const searchInput = document.getElementById("searchInput");
  const darkModeBtn = document.getElementById("darkModeBtn");
  const doaContainer = document.getElementById("doaContainer");
  const beritaContainer = document.getElementById("beritaContainer");
  const favoritContainer = document.getElementById("favoritContainer");
  const searchHistoryDiv = document.getElementById("searchHistory");

  let allData = [];
  let currentUser = null;

  // === TOGGLE MENU ===
  menuBtn?.addEventListener("click", () => {
    menuList.classList.toggle("hidden");
    menuList.style.display = menuList.classList.contains("hidden") ? "none" : "block";
  });

  document.addEventListener("click", (e) => {
    if (!menuBtn?.contains(e.target) && !menuList?.contains(e.target)) {
      menuList?.classList.add("hidden");
      menuList.style.display = "none";
    }
  });

  // === DARK MODE ===
  darkModeBtn?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
  });

  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }

  // === LOGIN ===
  loginBtn?.addEventListener("click", () => {
    window.location.href = "login.html";
  });

  // === DOA PAGE ===
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

  // === BERITA PAGE ===
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
        card.className = "doa";
        card.innerHTML = `
          <h3>${berita.judul}</h3>
          <p>${berita.isi}</p>
        `;
        beritaContainer.appendChild(card);
      });
    }
  }

  // === FAVORIT PAGE ===
  if (favoritContainer) {
    const favoritData = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (favoritData.length > 0) {
      favoritContainer.innerHTML = "";
      favoritData.forEach((doa, index) => {
        const card = document.createElement("div");
        card.className = "doa";
        card.innerHTML = `
          <h2>${doa.judul}</h2>
          <p><strong>Arab:</strong><br/>${doa.arab}</p>
          <p><strong>Latin:</strong><br/>${doa.latin}</p>
          <p><strong>Arti:</strong><br/>${doa.arti}</p>
          <button class="hapusBtn">🗑 Hapus</button>
        `;
        card.querySelector(".hapusBtn").addEventListener("click", () => {
          favoritData.splice(index, 1);
          localStorage.setItem("favorites", JSON.stringify(favoritData));
          location.reload();
        });
        favoritContainer.appendChild(card);
      });
    } else {
      favoritContainer.innerHTML = `<p class="empty">Belum ada doa yang difavoritkan.</p>`;
    }
  }

  // === SEARCH INPUT ===
  searchInput?.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();
    localStorage.setItem("lastSearch", keyword);
    if (keyword.trim()) simpanRiwayat(keyword);

    if (doaContainer) {
      const filtered = allData.filter(d => d.judul.toLowerCase().includes(keyword));
      displayDoa(filtered);
    } else if (beritaContainer) {
      const filtered = allData.filter(b => b.judul.toLowerCase().includes(keyword));
      displayBerita(filtered);
    }
  });

  // === LOAD LAST SEARCH ===
  if (searchInput && localStorage.getItem("lastSearch")) {
    searchInput.value = localStorage.getItem("lastSearch");
  }

  // === TAMPILKAN RIWAYAT SAAT AWAL ===
  tampilkanRiwayat();

  // === FUNGSI RIWAYAT PENCARIAN ===
  function simpanRiwayat(kataKunci) {
    let riwayat = JSON.parse(localStorage.getItem("searchHistory")) || [];
    riwayat = riwayat.filter(item => item !== kataKunci);
    riwayat.unshift(kataKunci);
    if (riwayat.length > 10) riwayat = riwayat.slice(0, 10);
    localStorage.setItem("searchHistory", JSON.stringify(riwayat));
    tampilkanRiwayat();
  }

  function tampilkanRiwayat() {
    if (!searchHistoryDiv) return;
    const riwayat = JSON.parse(localStorage.getItem("searchHistory")) || [];
    if (riwayat.length === 0) {
      searchHistoryDiv.innerHTML = "";
      return;
    }

    searchHistoryDiv.innerHTML = `
      <p><strong>Riwayat Pencarian:</strong></p>
      <ul style="list-style: none; padding-left: 0;">
        ${riwayat.map(item => `<li><button class="riwayat-btn">${item}</button></li>`).join("")}
      </ul>
    `;

    document.querySelectorAll(".riwayat-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        searchInput.value = btn.textContent;
        searchInput.dispatchEvent(new Event("input"));
      });
    });
  }
});
