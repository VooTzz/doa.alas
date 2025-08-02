document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const menuList = document.getElementById("menuList");

  menuBtn.addEventListener("click", () => {
    menuList.classList.toggle("hidden");
    menuList.style.display = menuList.classList.contains("hidden") ? "none" : "block";
  });

  // Load doa
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
