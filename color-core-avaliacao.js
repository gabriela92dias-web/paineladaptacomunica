const STORAGE_KEY = "color-core-avaliacao-v1";

const families = [
  { key: "energia", label: "Energia", options: ["A", "B", "C", "D"] },
  { key: "alegria", label: "Alegria", options: ["A", "B", "C", "D"] },
  { key: "seguranca", label: "Seguranca", options: ["A", "B", "C", "D"] },
];

const modeButtons = Array.from(document.querySelectorAll("[data-mode-target]"));
const copyButton = document.getElementById("copy-feedback-btn");
const downloadButton = document.getElementById("download-feedback-btn");
const exportOutput = document.getElementById("feedback-export");

function setMode(mode) {
  document.body.setAttribute("data-mode", mode);

  modeButtons.forEach((button) => {
    const active = button.dataset.modeTarget === mode;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function createScoreButtons() {
  document.querySelectorAll("[data-score-row]").forEach((row) => {
    const rowKey = row.dataset.scoreRow;
    for (let score = 0; score <= 10; score += 1) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "score-btn";
      button.textContent = String(score);
      button.dataset.scoreValue = String(score);
      button.dataset.scoreRow = rowKey;
      button.addEventListener("click", () => {
        row.querySelectorAll(".score-btn").forEach((btn) => {
          btn.classList.toggle("is-selected", btn === button);
        });
        saveState();
      });
      row.appendChild(button);
    }
  });
}

function readScores() {
  const state = {
    mode: document.body.getAttribute("data-mode") || "light",
    families: {},
  };

  families.forEach((family) => {
    const familyState = { scores: {}, notes: "" };

    family.options.forEach((option) => {
      const selected = document.querySelector(
        `.score-btn.is-selected[data-score-row="${family.key}-${option}"]`
      );
      familyState.scores[option] = selected ? Number(selected.dataset.scoreValue) : null;
    });

    const notesField = document.querySelector(`[data-notes-family="${family.key}"]`);
    familyState.notes = notesField ? notesField.value.trim() : "";

    state.families[family.key] = familyState;
  });

  return state;
}

function resolveWinner(scores) {
  const entries = Object.entries(scores).filter(([, value]) => value !== null);
  if (!entries.length) {
    return { label: "Sem vencedor", winners: [] };
  }

  const max = Math.max(...entries.map(([, value]) => value));
  const winners = entries
    .filter(([, value]) => value === max)
    .map(([key]) => key);

  if (winners.length === 1) {
    return { label: `Vencedor: ${winners[0]} (${max})`, winners };
  }

  return { label: `Empate: ${winners.join(", ")} (${max})`, winners };
}

function updateWinnerLabels(state) {
  families.forEach((family) => {
    const box = document.querySelector(`[data-winner-family="${family.key}"]`);
    const winner = resolveWinner(state.families[family.key].scores);
    if (box) {
      box.textContent = winner.label;
    }
  });
}

function buildExportText(state) {
  const lines = [
    "Feedback - Avaliacao Rapida Color Core",
    `Modo visual: ${state.mode}`,
    "",
  ];

  families.forEach((family) => {
    const familyState = state.families[family.key];
    const winner = resolveWinner(familyState.scores);

    lines.push(family.label);
    lines.push(
      family.options
        .map((option) => `${option}: ${familyState.scores[option] ?? "-"}`)
        .join(" | ")
    );
    lines.push(`Resultado: ${winner.label}`);
    lines.push(`Observacoes: ${familyState.notes || "(sem observacoes)"}`);
    lines.push("");
  });

  return lines.join("\n");
}

function saveState() {
  const state = readScores();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  updateWinnerLabels(state);
  exportOutput.value = buildExportText(state);
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const state = readScores();
    updateWinnerLabels(state);
    exportOutput.value = buildExportText(state);
    return;
  }

  try {
    const state = JSON.parse(raw);

    if (state.mode) {
      setMode(state.mode);
    }

    families.forEach((family) => {
      const familyState = state.families?.[family.key];
      if (!familyState) {
        return;
      }

      family.options.forEach((option) => {
        const value = familyState.scores?.[option];
        if (value === null || value === undefined) {
          return;
        }

        const button = document.querySelector(
          `.score-btn[data-score-row="${family.key}-${option}"][data-score-value="${value}"]`
        );
        if (button) {
          button.classList.add("is-selected");
        }
      });

      const notesField = document.querySelector(`[data-notes-family="${family.key}"]`);
      if (notesField) {
        notesField.value = familyState.notes || "";
      }
    });

    updateWinnerLabels(readScores());
    exportOutput.value = buildExportText(readScores());
  } catch (_error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function copyFeedback() {
  navigator.clipboard.writeText(exportOutput.value).then(() => {
    copyButton.textContent = "Copiado";
    setTimeout(() => {
      copyButton.textContent = "Copiar respostas";
    }, 1400);
  });
}

function downloadFeedback() {
  const state = readScores();
  const blob = new Blob([JSON.stringify(state, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "color-core-avaliacao.json";
  link.click();
  URL.revokeObjectURL(url);
}

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setMode(button.dataset.modeTarget);
    saveState();
  });
});

document.querySelectorAll(".notes-field").forEach((field) => {
  field.addEventListener("input", saveState);
  field.addEventListener("change", saveState);
});

copyButton.addEventListener("click", copyFeedback);
downloadButton.addEventListener("click", downloadFeedback);

createScoreButtons();
setMode(document.body.getAttribute("data-mode") || "light");
loadState();
