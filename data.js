/* ======================================================
   MERA AI - DONANIM & OYUN VERİTABANI
   Bu dosya SADECE veridir.
   Mantık YOK → fpsEngine & upgradeEngine kullanır.
====================================================== */

/* =========================
   CPU DATABASE
========================= */

const CPU_DB = [
  {
    id: "i3_12100f",
    brand: "Intel",
    name: "Intel Core i3-12100F",
    generation: 12,
    cores: 4,
    threads: 8,
    baseClock: 3.3,
    boostClock: 4.3,
    score: 420,
    tier: "entry",
    releaseYear: 2022,
    socket: "LGA1700"
  },
  {
    id: "i5_12400f",
    brand: "Intel",
    name: "Intel Core i5-12400F",
    generation: 12,
    cores: 6,
    threads: 12,
    baseClock: 2.5,
    boostClock: 4.4,
    score: 650,
    tier: "mid",
    releaseYear: 2022,
    socket: "LGA1700"
  },
  {
    id: "i7_13700k",
    brand: "Intel",
    name: "Intel Core i7-13700K",
    generation: 13,
    cores: 16,
    threads: 24,
    baseClock: 3.4,
    boostClock: 5.4,
    score: 860,
    tier: "high",
    releaseYear: 2023,
    socket: "LGA1700"
  },
  {
    id: "r5_5600",
    brand: "AMD",
    name: "Ryzen 5 5600",
    generation: 5,
    cores: 6,
    threads: 12,
    baseClock: 3.5,
    boostClock: 4.4,
    score: 620,
    tier: "mid",
    releaseYear: 2021,
    socket: "AM4"
  },
  {
    id: "r7_5800x",
    brand: "AMD",
    name: "Ryzen 7 5800X",
    generation: 5,
    cores: 8,
    threads: 16,
    baseClock: 3.8,
    boostClock: 4.7,
    score: 780,
    tier: "high",
    releaseYear: 2021,
    socket: "AM4"
  },
  {
    id: "r7_7800x3d",
    brand: "AMD",
    name: "Ryzen 7 7800X3D",
    generation: 7,
    cores: 8,
    threads: 16,
    baseClock: 4.2,
    boostClock: 5.0,
    score: 930,
    tier: "enthusiast",
    releaseYear: 2023,
    socket: "AM5"
  }
];

/* =========================
   GPU DATABASE
========================= */

const GPU_DB = [
  {
    id: "gtx_1660",
    brand: "NVIDIA",
    name: "GTX 1660",
    score: 380,
    tier: "entry",
    vram: 6,
    releaseYear: 2019,
    power: 120
  },
  {
    id: "rtx_2060",
    brand: "NVIDIA",
    name: "RTX 2060",
    score: 460,
    tier: "entry",
    vram: 6,
    releaseYear: 2019,
    power: 160
  },
  {
    id: "rtx_3060",
    brand: "NVIDIA",
    name: "RTX 3060",
    score: 600,
    tier: "mid",
    vram: 12,
    releaseYear: 2021,
    power: 170
  },
  {
    id: "rtx_4070",
    brand: "NVIDIA",
    name: "RTX 4070",
    score: 820,
    tier: "high",
    vram: 12,
    releaseYear: 2023,
    power: 200
  },
  {
    id: "rtx_4080",
    brand: "NVIDIA",
    name: "RTX 4080",
    score: 950,
    tier: "enthusiast",
    vram: 16,
    releaseYear: 2023,
    power: 320
  },
  {
    id: "rx_6700xt",
    brand: "AMD",
    name: "RX 6700 XT",
    score: 640,
    tier: "mid",
    vram: 12,
    releaseYear: 2021,
    power: 230
  },
  {
    id: "rx_7900xt",
    brand: "AMD",
    name: "RX 7900 XT",
    score: 900,
    tier: "enthusiast",
    vram: 20,
    releaseYear: 2023,
    power: 300
  }
];

/* =========================
   RAM OPTIONS
========================= */

const RAM_DB = [
  {
    size: 8,
    speed: 2666,
    tier: "low",
    scorePenalty: 0.85
  },
  {
    size: 16,
    speed: 3200,
    tier: "recommended",
    scorePenalty: 1.0
  },
  {
    size: 32,
    speed: 3600,
    tier: "high",
    scorePenalty: 1.05
  }
];

/* =========================
   GAME DATABASE
========================= */

const GAME_DB = {
  cs2: {
    name: "Counter-Strike 2",
    cpuWeight: 0.65,
    gpuWeight: 0.35,
    baseLoad: 0.85,
    vramNeed: {
      "1080p": 4,
      "1440p": 6,
      "4k": 8
    }
  },
  gta5: {
    name: "GTA V",
    cpuWeight: 0.45,
    gpuWeight: 0.55,
    baseLoad: 1.0,
    vramNeed: {
      "1080p": 4,
      "1440p": 6,
      "4k": 8
    }
  },
  cyberpunk: {
    name: "Cyberpunk 2077",
    cpuWeight: 0.35,
    gpuWeight: 0.65,
    baseLoad: 1.35,
    vramNeed: {
      "1080p": 8,
      "1440p": 10,
      "4k": 12
    }
  }
};

/* =========================
   QUALITY MULTIPLIERS
========================= */

const QUALITY_MULTIPLIER = {
  low: 1.35,
  medium: 1.1,
  high: 1.0,
  ultra: 0.85
};

/* =========================
   RESOLUTION MULTIPLIERS
========================= */

const RESOLUTION_MULTIPLIER = {
  "1080p": 1.0,
  "1440p": 0.78,
  "4k": 0.55
};

/* ======================================================
   HELPER FUNCTIONS (DATA LEVEL)
====================================================== */

function getCPUById(id) {
  return CPU_DB.find(c => c.id === id);
}

function getGPUById(id) {
  return GPU_DB.find(g => g.id === id);
}

function getGameByKey(key) {
  return GAME_DB[key];
}