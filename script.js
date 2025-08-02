document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const menuList = document.getElementById("menuList");

  // Toggle menu saat tombol diklik
  menuBtn.addEventListener("click", () => {
    menuList.classList.toggle("hidden");
    // Tambahkan kontrol tampilan manual agar menu bisa muncul di semua browser
    if (menuList.classList.contains("hidden")) {
      menuList.style.display = "none";
    } else {
      menuList.style.display = "block";
    }
  });

  // Menutup menu jika pengguna klik di luar menu
  document.addEventListener("click", (event) => {
    if (!menuBtn.contains(event.target) && !menuList.contains(event.target)) {
      menuList.classList.add("hidden");
      menuList.style.display = "none";
    }
  });

  // Memuat data doa dari doa.json
  fetch("doa.json")
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("doaContainer");
      data.forEach(doa => {
        const card = document.createElement("div");
        card.className = "doa";
        card.innerHTML = `
          <h3>${doa.judul}</h3>
          <p class="arab">${doa.arab}</p>
          <p><em>${doa.latin}</em></p>
          <p>${doa.arti}</p>
        `;
        container.appendChild(card);
      });
    });
});
