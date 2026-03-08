const modeButtons = Array.from(document.querySelectorAll("[data-mode-target]"));

function setMode(mode) {
  document.body.setAttribute("data-mode", mode);

  modeButtons.forEach((button) => {
    const isActive = button.dataset.modeTarget === mode;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setMode(button.dataset.modeTarget);
  });
});

setMode(document.body.getAttribute("data-mode") || "light");
