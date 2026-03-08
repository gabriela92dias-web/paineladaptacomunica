const STORAGE_KEY = "color-core-editor-v1";

const defaultState = {
  mode: "light",
  families: {
    energia: {
      fieldHigh: "#FFFAE0",
      fieldLow: "#FFE7A3",
      center: "#FFE2C2",
      accentA: "#FED376",
      accentB: "#F58E72",
    },
    alegria: {
      fieldHigh: "#FDE2DD",
      fieldLow: "#FFC8C2",
      center: "#FFA3B1",
      accentA: "#FE86A4",
      accentB: "#CF6E9B",
    },
    seguranca: {
      fieldHigh: "#F1E6F0",
      fieldLow: "#DEC7DE",
      center: "#D0AEE0",
      accentA: "#D1B4FE",
      accentB: "#9DA0EC",
    },
  },
};

const modeButtons = Array.from(document.querySelectorAll("[data-mode-target]"));
const exportOutput = document.getElementById("export-output");
const copyButton = document.getElementById("copy-state-btn");
const downloadButton = document.getElementById("download-state-btn");
const resetAllButton = document.getElementById("reset-all-btn");

function setMode(mode) {
  document.body.setAttribute("data-mode", mode);

  modeButtons.forEach((button) => {
    const isActive = button.dataset.modeTarget === mode;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function sanitizeHex(value) {
  const trimmed = value.trim().toUpperCase();
  if (/^#[0-9A-F]{6}$/.test(trimmed)) {
    return trimmed;
  }
  return null;
}

function applyFamilyPreview(family, tokens) {
  const preview = document.querySelector(`[data-preview-family="${family}"]`);
  if (!preview) {
    return;
  }

  preview.style.setProperty("--field-high", tokens.fieldHigh);
  preview.style.setProperty("--field-low", tokens.fieldLow);
  preview.style.setProperty("--center", tokens.center);
  preview.style.setProperty("--accent-a", tokens.accentA);
  preview.style.setProperty("--accent-b", tokens.accentB);
}

function readState() {
  const state = {
    mode: document.body.getAttribute("data-mode") || "light",
    families: {},
  };

  Object.keys(defaultState.families).forEach((family) => {
    state.families[family] = {};
    Object.keys(defaultState.families[family]).forEach((token) => {
      const input = document.querySelector(
        `[data-text-input][data-family="${family}"][data-token="${token}"]`
      );
      state.families[family][token] = input ? input.value.toUpperCase() : "";
    });
  });

  return state;
}

function buildExportText(state) {
  const lines = [
    "Estado - Color Core Editor",
    `Modo: ${state.mode}`,
    "",
  ];

  Object.entries(state.families).forEach(([family, tokens]) => {
    lines.push(family);
    Object.entries(tokens).forEach(([token, value]) => {
      lines.push(`  ${token}: ${value}`);
    });
    lines.push("");
  });

  return lines.join("\n");
}

function saveState() {
  const state = readState();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  exportOutput.value = buildExportText(state);
}

function setFamilyValues(family, tokens) {
  Object.entries(tokens).forEach(([token, value]) => {
    const colorInput = document.querySelector(
      `[data-color-input][data-family="${family}"][data-token="${token}"]`
    );
    const textInput = document.querySelector(
      `[data-text-input][data-family="${family}"][data-token="${token}"]`
    );

    if (colorInput) {
      colorInput.value = value;
    }
    if (textInput) {
      textInput.value = value;
    }
  });

  applyFamilyPreview(family, tokens);
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  const state = raw ? JSON.parse(raw) : defaultState;

  setMode(state.mode || defaultState.mode);

  Object.keys(defaultState.families).forEach((family) => {
    setFamilyValues(family, state.families?.[family] || defaultState.families[family]);
  });

  exportOutput.value = buildExportText(readState());
}

function syncTokenInput(family, token, source, value) {
  const normalized = sanitizeHex(value);
  if (!normalized) {
    return;
  }

  const colorInput = document.querySelector(
    `[data-color-input][data-family="${family}"][data-token="${token}"]`
  );
  const textInput = document.querySelector(
    `[data-text-input][data-family="${family}"][data-token="${token}"]`
  );

  if (source !== "color" && colorInput) {
    colorInput.value = normalized;
  }

  if (source !== "text" && textInput) {
    textInput.value = normalized;
  }

  const familyState = readState().families[family];
  familyState[token] = normalized;
  applyFamilyPreview(family, familyState);
  saveState();
}

function copyState() {
  navigator.clipboard.writeText(exportOutput.value).then(() => {
    copyButton.textContent = "Copiado";
    setTimeout(() => {
      copyButton.textContent = "Copiar estado";
    }, 1400);
  });
}

function downloadState() {
  const state = readState();
  const blob = new Blob([JSON.stringify(state, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "color-core-editor-state.json";
  link.click();
  URL.revokeObjectURL(url);
}

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setMode(button.dataset.modeTarget);
    saveState();
  });
});

document.querySelectorAll("[data-color-input]").forEach((input) => {
  input.addEventListener("input", () => {
    syncTokenInput(input.dataset.family, input.dataset.token, "color", input.value);
  });
});

document.querySelectorAll("[data-text-input]").forEach((input) => {
  input.addEventListener("change", () => {
    syncTokenInput(input.dataset.family, input.dataset.token, "text", input.value);
  });
  input.addEventListener("blur", () => {
    syncTokenInput(input.dataset.family, input.dataset.token, "text", input.value);
  });
});

document.querySelectorAll("[data-reset-family]").forEach((button) => {
  button.addEventListener("click", () => {
    const family = button.dataset.resetFamily;
    setFamilyValues(family, defaultState.families[family]);
    saveState();
  });
});

resetAllButton.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  loadState();
});

copyButton.addEventListener("click", copyState);
downloadButton.addEventListener("click", downloadState);

loadState();
