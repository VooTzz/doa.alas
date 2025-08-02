document.addEventListener("DOMContentLoaded", () => {
  fetch("juz30.json")
    .then(r => r.json())
    .then(data => {
      const cont = document.getElementById("juz30Container");
      data.forEach(s => {
        const sec = document.createElement("section");
        sec.className = "surat";
        sec.innerHTML = `
          <h2>${s.nomor}. ${s.nama}</h2>
          <p class="arab">${s.arab}</p>
          <p class="latin">${s.latin}</p>
          <p class="arti">${s.arti}</p>
        `;
        cont.appendChild(sec);
      });
    });
});
