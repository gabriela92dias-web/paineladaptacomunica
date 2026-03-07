const appShell = document.getElementById("app-shell");
const sidebarToggle = document.getElementById("sidebar-toggle");
const monthLabel = document.getElementById("radar-month-label");
const activityTrack = document.getElementById("activity-track");
const dashboard = document.getElementById("dashboard");
const radarSegmentsContainer = document.getElementById("radar-segments");
const radarEventsContainer = document.getElementById("radar-events");
const weekTitle = document.getElementById("week-title");
const weekSummary = document.getElementById("week-summary");
const weekItems = document.getElementById("week-items");
const monthTimeline = document.getElementById("month-timeline");
const timelineVariantLabel = document.getElementById("timeline-variant-label");
const alertList = document.getElementById("alert-list");
const timelineList = document.getElementById("timeline-list");
const toolGroups = document.getElementById("tool-groups");
const overviewMetrics = document.getElementById("overview-metrics");
const variantButtons = [...document.querySelectorAll("[data-variant-button]")];
const groupButtons = [...document.querySelectorAll("[data-group-toggle]")];

const currentMonth = "Marco";
monthLabel.textContent = currentMonth;

const activityItems = [
  "Guidelines em revisao",
  "Calendario mensal pronto",
  "Mascots em revisao",
  "Colors e gradients em espera",
];

const weeks = [
  {
    id: "week-1",
    label: "Semana 1",
    start: -90,
    size: 72,
    angle: -54,
    summary: "Alinhamento institucional.",
    items: [
      { title: "Revisao de identidade", meta: "Brand" },
      { title: "Planner mensal", meta: "Marketing" },
    ],
  },
  {
    id: "week-2",
    label: "Semana 2",
    start: -18,
    size: 72,
    angle: 18,
    summary: "Campanhas e agenda.",
    items: [
      { title: "Janela de campanha", meta: "Marketing" },
      { title: "Eventos do mes", meta: "Ops" },
    ],
  },
  {
    id: "week-3",
    label: "Semana 3",
    start: 54,
    size: 72,
    angle: 90,
    summary: "Acompanhamento do ciclo.",
    items: [
      { title: "Checkpoint de campanhas", meta: "Marketing" },
      { title: "Analise grafica", meta: "Tools" },
    ],
  },
  {
    id: "week-4",
    label: "Semana 4",
    start: 126,
    size: 72,
    angle: 162,
    summary: "Fechamento do mes.",
    items: [
      { title: "Resumo mensal", meta: "Ops" },
      { title: "Preparacao seguinte", meta: "Marketing" },
    ],
  },
  {
    id: "week-5",
    label: "Semana 5",
    start: 198,
    size: 72,
    angle: 234,
    summary: "Buffer e ajuste.",
    items: [
      { title: "Buffer estrategico", meta: "Direcao" },
      { title: "Ajuste de prioridades", meta: "Platform" },
    ],
  },
];

const radarEvents = [
  { label: "Planner", angle: -40, distance: 126 },
  { label: "Evento", angle: 24, distance: 172 },
  { label: "Checkpoint", angle: 96, distance: 140 },
  { label: "Resumo", angle: 166, distance: 160 },
];

const alerts = [
  { title: "Cor bloqueada", meta: "Tokens pendentes" },
  { title: "Templates neutros", meta: "Placeholders ativos" },
];

const timeline = [
  { time: "15:20", title: "Shell iniciado", meta: "Nova base" },
  { time: "14:42", title: "Estrutura consolidada", meta: "Radar + orbitas" },
];

const tools = [
  {
    title: "Design",
    items: [
      {
        name: "Colors",
        note: "Tokens",
        badge: "off",
        icon: colorIcon(),
        disabled: true,
      },
      {
        name: "Gradients",
        note: "Em espera",
        badge: "off",
        icon: gradientIcon(),
        disabled: true,
      },
      {
        name: "Typography",
        note: "Estrutural",
        badge: "ready",
        icon: typographyIcon(),
        disabled: false,
      },
    ],
  },
  {
    title: "Generators",
    items: [
      {
        name: "Mascots",
        note: "Posterior",
        badge: "standby",
        icon: mascotIcon(),
        disabled: false,
      },
    ],
  },
  {
    title: "Analysis",
    items: [
      {
        name: "Graphic Analysis",
        note: "Analise",
        badge: "ready",
        icon: analysisIcon(),
        disabled: false,
      },
    ],
  },
];

const metrics = [
  { label: "Areas", value: "4", meta: "Dashboard, Brand, Marketing, Tools" },
  { label: "Radar", value: "5", meta: "Semanas do mes" },
  { label: "Cor", value: "OFF", meta: "Modulos cromaticos em espera" },
  { label: "Shell", value: "v1", meta: "Base pronta" },
];

const variantMeta = {
  A: "Radar dominante",
  B: "Radar + timeline",
  C: "Console institucional",
};

function renderActivity() {
  const content = [...activityItems, ...activityItems]
    .map((item) => `<span class="ticker-item">${item}</span>`)
    .join("");
  activityTrack.innerHTML = content;
}

function renderRadar() {
  radarSegmentsContainer.innerHTML = weeks
    .map(
      (week, index) => `
        <button
          class="radar-segment ${index === 0 ? "is-active" : ""}"
          type="button"
          data-week-id="${week.id}"
          style="--start:${week.start}; --size:${week.size}; --mid:${week.angle}; --distance:184;"
          aria-label="${week.label}"
        >
          <span class="radar-segment__label">${week.label}</span>
        </button>
      `,
    )
    .join("");

  radarEventsContainer.innerHTML = radarEvents
    .map(
      (event) => `
        <div
          class="radar-event"
          style="--angle:${event.angle}; --distance:${event.distance};"
        >
          ${event.label}
        </div>
      `,
    )
    .join("");

  const segmentButtons = [...document.querySelectorAll(".radar-segment")];
  segmentButtons.forEach((button) => {
    button.addEventListener("click", () => {
      segmentButtons.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      const week = weeks.find((item) => item.id === button.dataset.weekId);
      if (week) {
        updateWeekDetails(week);
      }
    });
  });

  updateWeekDetails(weeks[0]);
}

function renderMonthTimeline() {
  monthTimeline.innerHTML = weeks
    .map(
      (week, index) => `
        <button
          class="timeline-chip ${index === 0 ? "is-active" : ""}"
          type="button"
          data-week-link="${week.id}"
        >
          <strong>${week.label}</strong>
          <span>${week.items[0].title}</span>
        </button>
      `,
    )
    .join("");

  const chips = [...document.querySelectorAll("[data-week-link]")];
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const id = chip.dataset.weekLink;
      const targetButton = document.querySelector(`[data-week-id="${id}"]`);
      if (targetButton instanceof HTMLElement) {
        targetButton.click();
      }
    });
  });
}

function updateWeekDetails(week) {
  weekTitle.textContent = week.label;
  weekSummary.textContent = week.summary;
  document.querySelectorAll("[data-week-link]").forEach((chip) => {
    chip.classList.toggle("is-active", chip.getAttribute("data-week-link") === week.id);
  });
  weekItems.innerHTML = week.items
    .map(
      (item) => `
        <li>
          ${item.title}
          <small>${item.meta}</small>
        </li>
      `,
    )
    .join("");
}

function renderOperations() {
  alertList.innerHTML = alerts
    .map(
      (alert) => `
        <li>
          ${alert.title}
          <small>${alert.meta}</small>
        </li>
      `,
    )
    .join("");

  timelineList.innerHTML = timeline
    .map(
      (entry) => `
        <li>
          <strong>${entry.time}</strong> - ${entry.title}
          <small>${entry.meta}</small>
        </li>
      `,
    )
    .join("");
}

function renderTools() {
  toolGroups.innerHTML = tools
    .map(
      (group) => `
        <section class="tool-group">
          <h4 class="tool-group__title">${group.title}</h4>
          ${group.items
            .map(
              (tool) => `
                <article class="tool-card ${tool.disabled ? "tool-card--disabled" : ""}">
                  <div class="tool-icon">${tool.icon}</div>
                  <div>
                    <strong>${tool.name}</strong>
                    <span>${tool.note}</span>
                  </div>
                  <span class="tool-badge">${tool.badge}</span>
                </article>
              `,
            )
            .join("")}
        </section>
      `,
    )
    .join("");
}

function renderMetrics() {
  overviewMetrics.innerHTML = metrics
    .map(
      (metric) => `
        <article class="metric-card">
          <div>
            <span class="section-label">${metric.label}</span>
            <div class="metric-card__value">${metric.value}</div>
          </div>
          <div class="metric-card__meta">
            <span>${metric.meta}</span>
          </div>
        </article>
      `,
    )
    .join("");
}

function setVariant(variant) {
  dashboard.dataset.variant = variant;
  timelineVariantLabel.textContent = variantMeta[variant];
  variantButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.variantButton === variant);
  });
}

function setSidebarState(nextState) {
  appShell.dataset.sidebar = nextState;
  sidebarToggle.textContent = nextState === "compact" ? "Expandir" : "Sidebar";
}

function colorIcon() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8"></circle>
      <path d="M12 4v16"></path>
      <path d="M4 12h16"></path>
      <circle cx="12" cy="12" r="1.2"></circle>
    </svg>
  `;
}

function gradientIcon() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="7" cy="8" r="3.5"></circle>
      <circle cx="17" cy="16" r="3.5"></circle>
      <path d="M9.8 10.6l4.4 2.8"></path>
    </svg>
  `;
}

function typographyIcon() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 18l4-12 4 12"></path>
      <path d="M8.6 13h4.8"></path>
      <path d="M5 20h14"></path>
    </svg>
  `;
}

function mascotIcon() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8"></circle>
      <circle cx="9.2" cy="10" r="1"></circle>
      <circle cx="14.8" cy="10" r="1"></circle>
      <path d="M9 14c1 1.1 2 1.6 3 1.6s2-.5 3-1.6"></path>
    </svg>
  `;
}

function analysisIcon() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 17l4-4 3 2 5-6 4 3"></path>
      <circle cx="10" cy="10" r="6"></circle>
      <path d="M14.5 14.5L20 20"></path>
    </svg>
  `;
}

renderActivity();
renderRadar();
renderMonthTimeline();
renderOperations();
renderTools();
renderMetrics();

variantButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setVariant(button.dataset.variantButton);
  });
});

groupButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const groupId = button.dataset.groupToggle;
    const target = document.getElementById(`group-${groupId}`);
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    if (target) {
      target.hidden = expanded;
    }
  });
});

sidebarToggle.addEventListener("click", () => {
  const nextState = appShell.dataset.sidebar === "compact" ? "expanded" : "compact";
  setSidebarState(nextState);
});

setVariant("A");
setSidebarState("expanded");
