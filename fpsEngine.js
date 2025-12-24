/* ======================================================
   MERA AI - FPS & BOTTLENECK ENGINE
   Bu dosya HESAPLAMA yapar.
   Veri data.js'ten gelir.
====================================================== */

/* =========================
   CORE FPS CALCULATION
========================= */

function calculateBaseFPS(cpu, gpu, game) {
  const cpuPart = cpu.score * game.cpuWeight;
  const gpuPart = gpu.score * game.gpuWeight;
  const combined = cpuPart + gpuPart;

  // normalize
  return combined / game.baseLoad;
}

/* =========================
   RAM EFFECT
========================= */

function applyRamEffect(baseFPS, ram) {
  return baseFPS * ram.scorePenalty;
}

/* =========================
   VRAM CHECK
========================= */

function checkVRAM(gpu, game, resolution) {
  const required = game.vramNeed[resolution];
  if (gpu.vram < required) {
    const diff = required - gpu.vram;
    return {
      ok: false,
      penalty: 1 - diff * 0.08,
      message: `⚠️ VRAM yetersiz (${gpu.vram} GB / ${required} GB)`
    };
  }
  return { ok: true, penalty: 1, message: "VRAM yeterli" };
}

/* =========================
   BOTTLENECK ANALYSIS
========================= */

function calculateBottleneck(cpu, gpu) {
  const ratio = cpu.score / gpu.score;

  if (ratio < 0.7) {
    return {
      type: "CPU",
      percent: Math.round((1 - ratio) * 100)
    };
  }

  if (ratio > 1.3) {
    return {
      type: "GPU",
      percent: Math.round((ratio - 1) * 100)
    };
  }

  return {
    type: "Balanced",
    percent: 0
  };
}

/* =========================
   FINAL FPS PIPELINE
========================= */

function calculateFinalFPS({
  cpu,
  gpu,
  ram,
  game,
  resolution,
  quality
}) {
  let fps = calculateBaseFPS(cpu, gpu, game);

  // RAM
  fps = applyRamEffect(fps, ram);

  // Quality
  fps *= QUALITY_MULTIPLIER[quality];

  // Resolution
  fps *= RESOLUTION_MULTIPLIER[resolution];

  // VRAM
  const vramCheck = checkVRAM(gpu, game, resolution);
  fps *= vramCheck.penalty;

  // normalize
  fps = Math.max(15, Math.round(fps / 10));

  const bottleneck = calculateBottleneck(cpu, gpu);

  return {
    fps,
    bottleneck,
    vramStatus: vramCheck.message
  };
}

/* =========================
   ANALYSIS REPORT
========================= */

function buildFPSReport(result, gameName) {
  let report = `🎮 ${gameName} FPS Analizi\n\n`;
  report += `Tahmini FPS: ≈ ${result.fps} FPS\n`;
  report += `${result.vramStatus}\n`;

  if (result.bottleneck.type !== "Balanced") {
    report += `⚠️ ${result.bottleneck.type} Bottleneck: %${result.bottleneck.percent}\n`;
  } else {
    report += `✅ Sistem dengeli\n`;
  }

  return report;
}
