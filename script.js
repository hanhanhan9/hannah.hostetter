function spawnSparkles(x, y) {
  const count = 7;
  for (let i = 0; i < count; i++) {
    const sparkle = document.createElement("span");
    sparkle.className = "sparkle";
    sparkle.textContent = "✨";
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.6;
    const distance = 26 + Math.random() * 24;
    sparkle.style.left = x + "px";
    sparkle.style.top = y + "px";
    sparkle.style.setProperty("--dx", Math.cos(angle) * distance + "px");
    sparkle.style.setProperty("--dy", Math.sin(angle) * distance + "px");
    sparkle.style.fontSize = 10 + Math.random() * 8 + "px";
    document.body.appendChild(sparkle);
    sparkle.addEventListener("animationend", () => sparkle.remove());
  }
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".button");
  if (!btn) return;

  const rect = btn.getBoundingClientRect();
  spawnSparkles(rect.left + rect.width / 2, rect.top + rect.height / 2);

  const href = btn.getAttribute("href");
  if (!href || btn.target === "_blank") return;

  e.preventDefault();
  setTimeout(() => {
    window.location.href = href;
  }, 180);
});
