function addEdgeSparkles(el, corners, variant) {
  corners.forEach((corner, i) => {
    const star = document.createElement("span");
    star.className = `edge-sparkle ${variant} corner-${corner}`;
    star.textContent = "✨";
    star.style.setProperty("--delay", `${i * 130}ms`);
    star.setAttribute("aria-hidden", "true");
    el.appendChild(star);
  });
}

document.querySelectorAll(".button").forEach((btn) => {
  addEdgeSparkles(btn, ["tr", "bl"], "sparkle-button");
});

document.querySelectorAll(".card-grid .card").forEach((card) => {
  addEdgeSparkles(card, ["tl", "tr", "bl", "br"], "sparkle-card");
});

function burst(el) {
  el.querySelectorAll(".edge-sparkle").forEach((star) => {
    star.classList.remove("burst");
    void star.offsetWidth; // restart animation
    star.classList.add("burst");
  });
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".button");
  const card = e.target.closest(".card-grid .card");

  if (btn) burst(btn);
  else if (card) burst(card);

  if (!btn) return;

  const href = btn.getAttribute("href");
  if (!href || btn.target === "_blank") return;

  e.preventDefault();
  setTimeout(() => {
    window.location.href = href;
  }, 260);
});
