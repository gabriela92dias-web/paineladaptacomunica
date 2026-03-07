const monthLabel = document.getElementById("radar-month-label");
const tickerTrack = document.getElementById("ticker-track");
const radarSegmentsContainer = document.getElementById("radar-segments");
const radarEventsContainer = document.getElementById("radar-events");
const weekTitle = document.getElementById("week-title");
const weekSummary = document.getElementById("week-summary");
const weekItems = document.getElementById("week-items");
const alertList = document.getElementById("alert-list");
const timelineList = document.getElementById("timeline-list");
const toolGroups = document.getElementById("tool-groups");
const overviewMetrics = document.getElementById("overview-metrics");

const currentMonth = "Marco";
monthLabel.textContent = currentMonth;

const tickerItems = [
  "Guidelines em revisao executiva",
  "Shell visual da plataforma em construcao",
  "Calendario mensal preparado para integracao real",
  "Mascots em revisao para fase posterior",
  "Colors e gradients seguem aguardando liberacao cromatica",
];

const weeks = [
  {
    id: "week-1",
    label: "Semana 1",
    start: -90,
    size: 72,
    angle: -54,
    summary: "Alinhamento institucional e consolidacao do calendario executivo.",
    items: [
      { title: "Revisao de identidade institucional", meta: "Brand / alinhamento interno" },
      { title: "Conferencia do planner mensal", meta: "Marketing / visao macro" },
    ],
  },
  {
    id: "week-2",
    label: "Semana 2",
    start: -18,
    size: 72,
    angle: 18,
    summary: "Janela de agenda institucional e checkpoints de direcao.",
    items: [
      { title: "Janela de campanha institucional", meta: "Marketing / marco do mes" },
      { title: "Atualizacao do calendario de eventos", meta: "Operations / visao geral" },
    ],
  },
  {
    id: "week-3",
    label: "Semana 3",
    start: 54,
    size: 72,
    angle: 90,
    summary: "Semana voltada a acompanhamento e leitura de atividade recente.",
    items: [
      { title: "Checkpoint de campanhas ativas", meta: "Marketing / acompanhamento" },
      { title: "Analise grafica institucional", meta: "Tools / readiness" },
    ],
  },
  {
    id: "week-4",
    label: "Semana 4",
    start: 126,
    size: 72,
    angle: 162,
    summary: "Fechamento do ciclo com relatorios e preparacao do mes seguinte.",
    items: [
      { title: "Resumo mensal de atividade", meta: "Operations / consolidacao" },
      { title: "Organizacao de ativos e pautas", meta: "Marketing / preparacao" },
    ],
  },
  {
    id: "week-5",
    label: "Semana 5",
    start: 198,
    size: 72,
    angle: 234,
    summary: "Buffer para replanejamento, ajuste de prioridades e organizacao.",
    items: [
      { title: "Buffer estrategico e retomada", meta: "Direcao / baixa densidade" },
      { title: "Ajustes de prioridade do proximo ciclo", meta: "Platform / governanca" },
    ],
  },
];

const radarEvents = [
  { label: "Planner mensal", angle: -40, distance: 126 },
  { label: "Evento institucional", angle: 24, distance: 172 },
  { label: "Checkpoint", angle: 96, distance: 140 },
  { label: "Resumo", angle: 166, distance: 160 },
];

const alerts = [
  { title: "Camada cromatica bloqueada", meta: "Todos os modulos cromaticos seguem em espera" },
  { title: "Templates em modo neutro", meta: "Pecas mostram placeholders provisorios" },
];

const timeline = [
  { time: "15:20", title: "Shell do dashboard iniciado", meta: "Nova central de controle visual em construcao" },
  { time: "14:42", title: "Estrutura de navegacao consolidada", meta: "Radar central, operations e tools como orbitas" },
];

const tools = [
  {
    title: "Design",
    items: [
      {
        name: "Colors",
        note: "Aguardando tokens",
        badge: "off",
        icon: colorIcon(),
        disabled: true,
      },
      {
        name: "Gradients",
        note: "Modulo em espera",
        badge: "off",
        icon: gradientIcon(),
        disabled: true,
      },
      {
        name: "Typography",
        note: "Camada estrutural",
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
        note: "Revisao posterior",
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
        note: "Leitura e verificacao",
        badge: "ready",
        icon: analysisIcon(),
        disabled: false,
      },
    ],
  },
];

const metrics = [
  { label: "Areas", value: "4", meta: "Dashboard, Brand, Marketing e Tools" },
  { label: "Radar", value: "5", meta: "Semanas do mes no instrumento central" },
  { label: "Cor", value: "OFF", meta: "Colors, gradients e paletas em espera" },
  { label: "Shell", value: "v1", meta: "Base visual pronta" },
];

function renderTicker() {
  const content = [...tickerItems, ...tickerItems]
    .map((item) => `<span class="ticker-item">${item}</span>`)
    .join("");
  tickerTrack.innerHTML = content;
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

function updateWeekDetails(week) {
  weekTitle.textContent = week.label;
  weekSummary.textContent = week.summary;
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

renderTicker();
renderRadar();
renderOperations();
renderTools();
renderMetrics();
