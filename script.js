function addEdgeSparkles(el, corners, variant) {
  const emoji = el.dataset.sparkle || "✨";
  corners.forEach((corner, i) => {
    const star = document.createElement("span");
    star.className = `edge-sparkle ${variant} corner-${corner}`;
    star.textContent = emoji;
    star.style.setProperty("--delay", `${i * 130}ms`);
    star.setAttribute("aria-hidden", "true");
    el.appendChild(star);
  });
}

document.querySelectorAll(".button").forEach((btn) => {
  const motion = btn.dataset.sparkleMotion === "spin" ? "sparkle-spin" : "sparkle-button";
  addEdgeSparkles(btn, ["tr", "bl"], motion);
});

function burst(el) {
  el.querySelectorAll(".edge-sparkle").forEach((star) => {
    star.classList.remove("burst");
    void star.offsetWidth; // restart animation
    star.classList.add("burst");
  });
}

// PDF viewer modal: keeps writing samples opening inline in the page
// instead of triggering the visitor's browser download/PDF-handling setting.
const pdfModal = document.createElement("div");
pdfModal.className = "pdf-modal";
pdfModal.innerHTML =
  '<div class="pdf-modal-inner"><button class="pdf-modal-close" aria-label="Close">✕</button><iframe></iframe></div>';
document.body.appendChild(pdfModal);

const pdfFrame = pdfModal.querySelector("iframe");

function openPdf(url) {
  pdfFrame.src = url;
  pdfModal.classList.add("open");
}

function closePdf() {
  pdfModal.classList.remove("open");
  pdfFrame.src = "";
}

pdfModal.querySelector(".pdf-modal-close").addEventListener("click", closePdf);
pdfModal.addEventListener("click", (e) => {
  if (e.target === pdfModal) closePdf();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closePdf();
});

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".button");
  if (!btn) return;

  burst(btn);

  const href = btn.getAttribute("href");
  if (!href) return;

  if (href.toLowerCase().endsWith(".pdf")) {
    e.preventDefault();
    openPdf(href);
    return;
  }

  if (btn.target === "_blank") return;

  e.preventDefault();
  setTimeout(() => {
    window.location.href = href;
  }, 260);
});
