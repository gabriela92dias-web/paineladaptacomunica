const STORAGE_KEY = "color-core-familias-feedback-v1";

const modeButtons = Array.from(document.querySelectorAll("[data-mode-target]"));
const exportOutput = document.getElementById("feedback-export");
const copyButton = document.getElementById("copy-feedback-btn");
const downloadButton = document.getElementById("download-feedback-btn");

const familyConfigs = [
  { key: "energia", label: "Energia" },
  { key: "alegria", label: "Alegria" },
  { key: "seguranca", label: "Seguranca" },
];

function setMode(mode) {
  document.body.setAttribute("data-mode", mode);

  modeButtons.forEach((button) => {
    const isActive = button.dataset.modeTarget === mode;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function readFeedbackState() {
  const state = {
    mode: document.body.getAttribute("data-mode") || "light",
    families: {},
  };

  familyConfigs.forEach(({ key, label }) => {
    const selected = document.querySelector(`input[name="status-${key}"]:checked`);
    const notesField = document.getElementById(`obs-${key}`);

    state.families[key] = {
      label,
      status: selected ? selected.value : "sem resposta",
      notes: notesField ? notesField.value.trim() : "",
    };
  });

  return state;
}

function buildExportText(state) {
  const lines = [
    "Feedback - Color Core Familias",
    `Modo visual: ${state.mode}`,
    "",
  ];

  familyConfigs.forEach(({ key, label }) => {
    const family = state.families[key];
    lines.push(`${label}`);
    lines.push(`Status: ${family.status}`);
    lines.push(`Observacoes: ${family.notes || "(sem observacoes)"}`);
    lines.push("");
  });

  return lines.join("\n");
}

function saveState() {
  const state = readFeedbackState();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  exportOutput.value = buildExportText(state);
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    exportOutput.value = buildExportText(readFeedbackState());
    return;
  }

  try {
    const state = JSON.parse(raw);

    if (state.mode) {
      setMode(state.mode);
    }

    familyConfigs.forEach(({ key }) => {
      const family = state.families?.[key];
      if (!family) {
        return;
      }

      const statusInput = document.querySelector(
        `input[name="status-${key}"][value="${family.status}"]`
      );
      if (statusInput) {
        statusInput.checked = true;
      }

      const notesField = document.getElementById(`obs-${key}`);
      if (notesField) {
        notesField.value = family.notes || "";
      }
    });
  } catch (_error) {
    localStorage.removeItem(STORAGE_KEY);
  }

  exportOutput.value = buildExportText(readFeedbackState());
}

function copyFeedback() {
  const text = exportOutput.value;
  navigator.clipboard.writeText(text).then(() => {
    copyButton.textContent = "Copiado";
    setTimeout(() => {
      copyButton.textContent = "Copiar respostas";
    }, 1500);
  });
}

function downloadFeedback() {
  const state = readFeedbackState();
  const blob = new Blob([JSON.stringify(state, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "color-core-feedback.json";
  link.click();
  URL.revokeObjectURL(url);
}

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setMode(button.dataset.modeTarget);
    saveState();
  });
});

document.querySelectorAll('input[type="radio"], textarea').forEach((element) => {
  element.addEventListener("change", saveState);
  element.addEventListener("input", saveState);
});

copyButton.addEventListener("click", copyFeedback);
downloadButton.addEventListener("click", downloadFeedback);

setMode(document.body.getAttribute("data-mode") || "light");
loadState();
