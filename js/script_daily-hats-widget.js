
  function updateTaskCount() {
    const checkboxes = document.querySelectorAll('.hats-list input[type="checkbox"]');
    const completed = Array.from(checkboxes).filter(cb => cb.checked).length;
    const total = checkboxes.length;
    document.getElementById('completedCount').textContent = `${completed}/${total} Done`;
  }

  const CHECKBOX_KEY = 'dailyHatsStatus';

  function updateTaskCount() {
    const checkboxes = document.querySelectorAll('.hats-list input[type="checkbox"]');
    const completed = Array.from(checkboxes).filter(cb => cb.checked).length;
    const total = checkboxes.length;
    document.getElementById('completedCount').textContent = `${completed}/${total} Done`;
  }

  function saveCheckboxState() {
    const checkboxes = document.querySelectorAll('.hats-list input[type="checkbox"]');
    const state = Array.from(checkboxes).map(cb => cb.checked);
    localStorage.setItem(CHECKBOX_KEY, JSON.stringify(state));
  }

  function loadCheckboxState() {
    const saved = localStorage.getItem(CHECKBOX_KEY);
    if (!saved) return;

    const stateArray = JSON.parse(saved);
    const checkboxes = document.querySelectorAll('.hats-list input[type="checkbox"]');
    checkboxes.forEach((cb, index) => {
      cb.checked = !!stateArray[index];
    });
  }

  // تفعيل الأحداث
  const hatsCheckboxes = document.querySelectorAll('.hats-list input[type="checkbox"]');
  hatsCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      saveCheckboxState();
      updateTaskCount();
    });
  });

  // عند تحميل الصفحة
  loadCheckboxState();
  updateTaskCount();

/* 
 ملخص ما يقوم به الكود:
updateTaskCount()

يحسب كم مهمة تم إنجازها (checked) ويعرض النتيجة مثل 3/6 Done.

saveCheckboxState()

يحفظ حالة كل checkbox (هل هو مفعل أو لا) في localStorage تحت المفتاح dailyHatsStatus.

loadCheckboxState()

عند تحميل الصفحة، يسترجع الحالة السابقة من localStorage ويطبّقها.

Event Listeners

كل مرة تغيّر حالة أي checkbox:

تُحفظ الحالة.

يُحدث العدّاد.
*/