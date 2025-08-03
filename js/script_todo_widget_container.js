const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// تحميل المهام عند فتح الصفحة
window.addEventListener('load', loadTasksFromLocalStorage);

// إضافة مهمة عند الضغط على الزر
addTaskBtn.addEventListener('click', addTask);

// إضافة مهمة عند الضغط على Enter
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

function addTask() {
  const text = taskInput.value.trim();
  if (text === '') return;
  createTaskElement(text, false); // false لأن المهمة جديدة وليست مكتملة
  taskInput.value = '';
  saveTasksToLocalStorage();
}

function createTaskElement(text, completed) {
  const li = document.createElement('li');
  li.className = 'task-item';
  if (completed) {
    li.classList.add('line-through', 'text-gray-500', 'bg-green-50', 'hover:bg-green-100');
  }

  const span = document.createElement('span');
  span.className = 'task-text';
  span.textContent = text;

  // عند الضغط على المهمة: تحديدها كمكتملة أو إلغاء التحديد
  span.addEventListener('click', () => {
    li.classList.toggle('line-through');
    li.classList.toggle('text-gray-500');
    li.classList.toggle('bg-green-50');
    li.classList.toggle('hover:bg-green-100');
    li.classList.toggle('bg-gray-50');
    li.classList.toggle('hover:bg-gray-100');
    saveTasksToLocalStorage();
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-button';
  deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';



  // ✅ زر التعديل
const editBtn = document.createElement('button');
editBtn.className = 'edit-button';
editBtn.innerHTML = '<i class="fas fa-edit"></i>';

editBtn.addEventListener('click', () => {
  if (editBtn.dataset.mode !== 'editing') {
    // تحويل النص إلى input
    const input = document.createElement('input');
    input.type = 'text';
    input.value = span.textContent;
    input.className = 'task-edit-input';
    li.replaceChild(input, span);
    editBtn.innerHTML = '<i class="fas fa-check"></i>';
    editBtn.dataset.mode = 'editing';
  } else {
    // حفظ التعديلات
    const input = li.querySelector('input');
    const newText = input.value.trim();
    if (newText !== '') {
      span.textContent = newText;
      li.replaceChild(span, input);
      editBtn.innerHTML = '<i class="fas fa-edit"></i>';
      editBtn.dataset.mode = '';
      saveTasksToLocalStorage();
    }
  }
});

 

  // عند الضغط على زر الحذف
  deleteBtn.addEventListener('click', () => {
    li.remove();
    saveTasksToLocalStorage();
  });

  const actionsDiv = document.createElement('div');
  actionsDiv.className = 'actions-div';
  actionsDiv.appendChild(editBtn);
  actionsDiv.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(actionsDiv);
  taskList.appendChild(li);
}

function saveTasksToLocalStorage() {
  const tasks = [];
  document.querySelectorAll('.task-item').forEach((item) => {
    const text = item.querySelector('.task-text').textContent;
    const completed = item.classList.contains('line-through');
    tasks.push({ text, completed });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach((task) => createTaskElement(task.text, task.completed));
}


