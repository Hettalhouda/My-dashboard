let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function renderCalendar() {
  const daysContainer = document.getElementById("calendar-days");
  const header = document.getElementById("calendar-header");
  const now = new Date();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();

  header.innerText = `${monthNames[currentMonth]} ${currentYear}`;
  daysContainer.innerHTML = "";

  for (let i = 0; i < firstDay; i++) {
    daysContainer.innerHTML += "<div></div>";
  }

  for (let d = 1; d <= lastDate; d++) {
    const isToday =
      d === now.getDate() &&
      currentMonth === now.getMonth() &&
      currentYear === now.getFullYear();
    const className = isToday ? "today" : "";
    daysContainer.innerHTML += `<div class="${className}">${d}</div>`;
  }
}

document.getElementById("prev-month").addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
});

document.getElementById("next-month").addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
});

 // أول مرة تظهر فيها الصفحة


function updateTimeAndDate() {
  const now = new Date();
 const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

 const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


  const day = dayNames[now.getDay()];
  const date = now.getDate();
  const month = monthNames[now.getMonth()];
  const year = now.getFullYear();

  const hours = now.getHours().toString().padStart(2, '0');
  const mins = now.getMinutes().toString().padStart(2, '0');
  const secs = now.getSeconds().toString().padStart(2, '0');

  document.getElementById("today-date").innerText = `${day} ${date} ${month} ${year}`;
  document.getElementById("current-time").innerText = `${hours}:${mins}:${secs}`;
}

// تشغيل التقويم والساعة
renderCalendar();
updateTimeAndDate();
setInterval(updateTimeAndDate, 1000);


