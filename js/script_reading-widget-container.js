

async function fetchFact() {
  let attempts = 0;
  let fact = null;

  while (attempts < 5 && !fact) {
    try {
      const response = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en");
      const data = await response.json();
      const wordCount = data.text.trim().split(/\s+/).length;

      if (wordCount <= 12) {
        fact = data.text;
        break;
      }
    } catch (error) {
      console.error("API Error:", error);
      break;
    }
    attempts++;
  }

  if (fact) {
    document.getElementById("readingContent").textContent = " - " + fact;
  } else {
    document.getElementById("readingContent").textContent = "⚠️ No short fact found after several attempts.";
  }
}




// 📅 جلب حدث تاريخي من API
// 📅 جلب حدث تاريخي من API مع شرط عدد الكلمات
async function loadHistoryEvent() {
  try {
    const response = await fetch('https://history.muffinlabs.com/date');
    const data = await response.json();
    const events = data.data.Events;

    // نحاول اختيار حدث لا يتجاوز 11 كلمة
    let selectedEvent = null;

    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      const wordCount = event.text.trim().split(/\s+/).length;
      if (wordCount <= 11) {
        selectedEvent = event;
        break; // نتوقف عند أول حدث مناسب
      }
    }

    if (selectedEvent) {
      document.getElementById("historyContent").textContent = `${selectedEvent.year} - ${selectedEvent.text}`;
    } else {
      document.getElementById("historyContent").textContent = "لا يوجد حدث قصير لهذا اليوم.";
    }

  } catch (error) {
    document.getElementById("historyContent").textContent = "تعذر تحميل الحدث التاريخي.";
  }
}



// 💡 معلومة تقنية - من قائمة محلية
const techFacts = [
  "HTML هي لغة توصيف وليست لغة برمجة.",
  "CSS تسمح لك بفصل التصميم عن المحتوى.",
  "JavaScript تعمل في المتصفح وعلى الخادم (Node.js).",
  "React هي مكتبة لبناء واجهات المستخدم طورتها Meta.",
  "Git يسمح لك بتتبع تغييرات الكود والعمل ضمن فرق.",
  "API هو جسر للتواصل بين الأنظمة أو التطبيقات."
];

function loadTechFact() {
  const index = Math.floor(Date.now() / (1000 * 60 * 10)) % techFacts.length; // يتغير كل 10 دقائق
  document.getElementById("techFactContent").textContent = techFacts[index];
}

// عند تحميل الصفحة
window.addEventListener("load", () => { //عند تحميل الصفحة 
  fetchFact();
  setInterval(fetchFact, 6000); // كل 10 دقائق
});
      

document.addEventListener("DOMContentLoaded", () => {
  loadHistoryEvent();
  loadTechFact();
});
