document.addEventListener("DOMContentLoaded", () => {
  fetch("juz30.json")
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("juz30Container");
      container.innerHTML = ""; // Bersihkan loading text

      data.forEach(surat => {
        // Buat elemen surat
        const suratDiv = document.createElement("div");
        suratDiv.className = "surat-item";
        suratDiv.innerHTML = `<strong>${surat.nomor}. ${surat.nama}</strong>`;

        // Buat container ayat, tapi disembunyikan dulu
        const ayatContainer = document.createElement("div");
        ayatContainer.className = "ayat-container";
        ayatContainer.style.display = "none";

        // Tambahkan semua ayat
        surat.ayat.forEach(ayat => {
          const ayatDiv = document.createElement("div");
          ayatDiv.className = "ayat";
          ayatDiv.innerHTML = `
            <p><strong>(${ayat.nomor})</strong></p>
            <p class="arab">${ayat.arab}</p>
            <p class="latin">${ayat.latin}</p>
            <p class="arti">${ayat.arti}</p>
          `;
          ayatContainer.appendChild(ayatDiv);
        });

        // Toggle ayat ketika nama surat diklik
        suratDiv.addEventListener("click", () => {
          ayatContainer.style.display = ayatContainer.style.display === "none" ? "block" : "none";
        });

        container.appendChild(suratDiv);
        container.appendChild(ayatContainer);
      });
    })
    .catch(err => {
      document.getElementById("juz30Container").innerText = "Gagal memuat data.";
      console.error("Error memuat Juz 30:", err);
    });
});
