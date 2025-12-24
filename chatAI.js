/* ======================================================
   MERA AI - CHAT & INTENT ENGINE
   Bu dosya sohbet zekâsını yönetir.
====================================================== */

/* =========================
   UTIL
========================= */

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* =========================
   INTENTS
========================= */

const INTENTS = [
  {
    name: "greeting",
    keywords: ["merhaba", "selam", "hey", "sa"],
    responses: [
      "Merhaba 👋",
      "Selam! Nasıl yardımcı olabilirim?",
      "Hoş geldin 😄"
    ]
  },
  {
    name: "how_are_you",
    keywords: ["nasılsın", "napıyorsun", "ne haber"],
    responses: [
      "İyiyim, sistemleri analiz ediyorum 😄",
      "Gayet iyiyim, senin için buradayım 👍"
    ]
  },
  {
    name: "thanks",
    keywords: ["teşekkür", "sağol", "eyvallah"],
    responses: [
      "Rica ederim 👍",
      "Ne demek, her zaman buradayım 😄"
    ]
  },
  {
    name: "what_are_you",
    keywords: ["nesin", "kimsin", "ne yapıyorsun"],
    responses: [
      "Ben MERA AI. PC donanım analizi ve FPS tahmini yapıyorum 💻🎮"
    ]
  }
];

/* =========================
   HARDWARE Q&A
========================= */

const HARDWARE_QA = [
  {
    keywords: ["cpu nedir", "işlemci nedir"],
    answer:
      "CPU (işlemci), bilgisayarın beynidir. Oyunlarda FPS stabilitesini doğrudan etkiler."
  },
  {
    keywords: ["gpu nedir", "ekran kartı nedir"],
    answer:
      "GPU (ekran kartı), oyunlardaki grafik işlemlerini yapar. FPS üzerinde en büyük etkiye sahiptir."
  },
  {
    keywords: ["ram nedir"],
    answer:
      "RAM, çalışan programların geçici belleğidir. Yetersiz RAM FPS düşüşlerine ve takılmalara yol açar."
  },
  {
    keywords: ["bottleneck nedir", "darboğaz nedir"],
    answer:
      "Bottleneck, bir donanımın diğerini kısıtlamasıdır. Genelde CPU veya GPU kaynaklı olur."
  }
];

/* =========================
   SMART REPLY CORE
========================= */

function smartReply(message) {
  const text = message.toLowerCase();

  // INTENTS
  for (const intent of INTENTS) {
    if (intent.keywords.some(k => text.includes(k))) {
      return randomItem(intent.responses);
    }
  }

  // HARDWARE QUESTIONS
  for (const qa of HARDWARE_QA) {
    if (qa.keywords.some(k => text.includes(k))) {
      return qa.answer;
    }
  }

  // FPS KEYWORDS
  if (text.includes("fps")) {
    return "Hangi oyunu ve sistemi sorduğunu belirtir misin? 🎮";
  }

  // UPGRADE KEYWORDS
  if (text.includes("upgrade") || text.includes("yükselt")) {
    return "Sistemini seçersen hangi parçayı yükseltmen gerektiğini hesaplayabilirim 🚀";
  }

  // FALLBACK
  return "Bu konuda net bir bilgim yok ama sistemini analiz edebilirim 👀";
}