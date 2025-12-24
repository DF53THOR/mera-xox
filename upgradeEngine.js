/* ======================================================
   MERA AI - UPGRADE ENGINE
   Bu dosya ANALİZ + ÖNERİ üretir.
   fpsEngine.js sonuçlarını kullanır.
====================================================== */

/* =========================
   UPGRADE IMPACT RATIOS
========================= */

const UPGRADE_IMPACT = {
  cpu: 0.28,
  gpu: 0.55,
  ram: 0.17
};

/* =========================
   WEAK POINT DETECTION
========================= */

function detectWeakPoint(cpu, gpu, ram, game, resolution) {
  // VRAM kontrolü
  const vramNeed = game.vramNeed[resolution];
  if (gpu.vram < vramNeed) {
    return {
      part: "gpu",
      reason: "VRAM yetersiz"
    };
  }

  // RAM kontrolü
  if (ram.size < 16) {
    return {
      part: "ram",
      reason: "RAM miktarı düşük"
    };
  }

  // CPU / GPU oranı
  const ratio = cpu.score / gpu.score;

  if (ratio < 0.7) {
    return {
      part: "cpu",
      reason: "CPU ekran kartını besleyemiyor"
    };
  }

  if (ratio > 1.3) {
    return {
      part: "gpu",
      reason: "Ekran kartı işlemciye göre zayıf"
    };
  }

  return {
    part: "balanced",
    reason: "Sistem dengeli"
  };
}

/* =========================
   FPS GAIN ESTIMATION
========================= */

function estimateFPSGain(currentFPS, part) {
  const impact = UPGRADE_IMPACT[part];
  if (!impact) return 0;
  return Math.round(currentFPS * impact);
}

/* =========================
   UPGRADE ADVISOR
========================= */

function getUpgradeAdvice({
  cpu,
  gpu,
  ram,
  game,
  resolution,
  quality
}) {
  const fpsResult = calculateFinalFPS({
    cpu,
    gpu,
    ram,
    game,
    resolution,
    quality
  });

  const weak = detectWeakPoint(cpu, gpu, ram, game, resolution);

  let adviceText = "✅ Sisteminiz genel olarak dengeli.\n";
  let gainText = "";

  if (weak.part !== "balanced") {
    const gain = estimateFPSGain(fpsResult.fps, weak.part);

    adviceText =
      `🚀 Önerilen Yükseltme: ${weak.part.toUpperCase()}\n` +
      `Sebep: ${weak.reason}\n`;

    if (gain > 0) {
      gainText = `Tahmini FPS artışı: +${gain} FPS\n`;
    }
  }

  return {
    currentFPS: fpsResult.fps,
    bottleneck: fpsResult.bottleneck,
    advice: adviceText + gainText
  };
}

/* =========================
   UPGRADE REPORT BUILDER
========================= */

function buildUpgradeReport(result, gameName) {
  let report = `🔧 Upgrade Analizi – ${gameName}\n\n`;
  report += `Mevcut FPS: ≈ ${result.currentFPS} FPS\n\n`;
  report += result.advice;

  if (result.bottleneck.type !== "Balanced") {
    report += `\n⚠️ ${result.bottleneck.type} darboğazı tespit edildi (%${result.bottleneck.percent})`;
  }

  return report;
}