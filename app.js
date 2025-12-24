/* ======================================================
   MERA AI - MAIN APP CONTROLLER
   TÜM SİSTEMLER BURADA BİRLEŞİR
====================================================== */

/* =========================
   GLOBAL STATE
========================= */

const state = {
  cpu: null,
  gpu: null,
  ram: null,
  game: null,
  resolution: "1080p",
  quality: "high"
};

/* =========================
   UI ELEMENTS
========================= */

const splash = document.getElementById("splash");
const app = document.getElementById("app");

const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

const cpuSelect = document.getElementById("cpuSelect");
const gpuSelect = document.getElementById("gpuSelect");
const ramSelect = document.getElementById("ramSelect");

const gameSelect = document.getElementById("gameSelect");
const resolutionSelect = document.getElementById("resolutionSelect");
const qualitySelect = document.getElementById("qualitySelect");

/* =========================
   INIT
========================= */

window.addEventListener("load", () => {
  setTimeout(() => {
    splash.classList.add("hidden");
    app.classList.remove("hidden");

    initSelects();
    addAIMessage("Merhaba 👋 Ben MERA AI. Sistemini analiz edebilirim.");
  }, 1200);
});

/* =========================
   LOAD SELECT OPTIONS
========================= */

function initSelects() {
  cpuSelect.innerHTML = CPU_DB.map(
    c => `<option value="${c.id}">${c.name}</option>`
  ).join("");

  gpuSelect.innerHTML = GPU_DB.map(
    g => `<option value="${g.id}">${g.name}</option>`
  ).join("");

  gameSelect.innerHTML = Object.keys(GAME_DB).map(
    k => `<option value="${k}">${GAME_DB[k].name}</option>`
  ).join("");

  state.cpu = CPU_DB[0];
  state.gpu = GPU_DB[0];
  state.ram = RAM_DB[1];
  state.game = GAME_DB[gameSelect.value];
}

/* =========================
   CHAT FUNCTIONS
========================= */

function addUserMessage(text) {
  const div = document.createElement("div");
  div.className = "message user";
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function addAIMessage(text) {
  const div = document.createElement("div");
  div.className = "message ai";
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

/* =========================
   CHAT EVENTS
========================= */

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", e => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addUserMessage(text);
  userInput.value = "";

  const reply = smartReply(text);
  addAIMessage(reply);
}

/* =========================
   PANEL TOGGLE
========================= */

document.querySelectorAll(".menu button").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.panel;
    document.querySelectorAll(".panel").forEach(p =>
      p.classList.add("hidden")
    );
    document.getElementById(target).classList.remove("hidden");
  });
});

/* =========================
   PC BUILDER
========================= */

document.getElementById("pcAnalyzeBtn").addEventListener("click", () => {
  state.cpu = getCPUById(cpuSelect.value);
  state.gpu = getGPUById(gpuSelect.value);
  state.ram = RAM_DB[ramSelect.value];

  addAIMessage(
    `🧩 Sistem Seçildi:\n` +
    `${state.cpu.name}\n` +
    `${state.gpu.name}\n` +
    `${state.ram.size} GB RAM`
  );
});

/* =========================
   FPS ANALYSIS
========================= */

document.getElementById("fpsBtn").addEventListener("click", () => {
  state.game = getGameByKey(gameSelect.value);
  state.resolution = resolutionSelect.value;
  state.quality = qualitySelect.value;

  const result = calculateFinalFPS({
    cpu: state.cpu,
    gpu: state.gpu,
    ram: state.ram,
    game: state.game,
    resolution: state.resolution,
    quality: state.quality
  });

  const report = buildFPSReport(result, state.game.name);
  addAIMessage(report);
});

/* =========================
   UPGRADE ANALYSIS
========================= */

document.getElementById("upgradeBtn").addEventListener("click", () => {
  if (!state.game) {
    addAIMessage("Önce bir oyun seçmelisin 🎮");
    return;
  }

  const result = getUpgradeAdvice({
    cpu: state.cpu,
    gpu: state.gpu,
    ram: state.ram,
    game: state.game,
    resolution: state.resolution,
    quality: state.quality
  });

  const report = buildUpgradeReport(result, state.game.name);
  addAIMessage(report);
});