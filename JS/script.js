document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const dateInput = document.getElementById("todo-date");
  const list = document.getElementById("todo-list");
  const filter = document.getElementById("filter-input");
  const deleteAllBtn = document.getElementById("delete-all");

  // Stats elements
  const totalTasksEl = document.getElementById("total-tasks");
  const completedTasksEl = document.getElementById("completed-tasks");
  const pendingTasksEl = document.getElementById("pending-tasks");
  const progressEl = document.getElementById("progress");

  let tasks = []; // store all tasks

  // 🔹 Update Stats
  function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

    totalTasksEl.textContent = total;
    completedTasksEl.textContent = completed;
    pendingTasksEl.textContent = pending;
    progressEl.textContent = progress + "%";
  }

  // 🔹 Render Tasks
  function renderTasks() {
    list.innerHTML = "";

    if (tasks.length === 0) {
      list.innerHTML = `<tr><td colspan="4" class="no-task">No tasks found</td></tr>`;
      updateStats();
      return;
    }

    tasks.forEach((task, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${task.text}</td>
        <td>${task.date}</td>
        <td>${task.completed ? "✅ Completed" : "⏳ Pending"}</td>
        <td>
          <button class="complete" data-index="${index}">✔</button>
          <button class="delete" data-index="${index}">🗑</button>
        </td>
      `;
      list.appendChild(row);
    });

    updateStats();
  }

  // 🔹 Add Task
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskText = input.value.trim();
    const taskDate = dateInput.value;

    if (!taskText || !taskDate) {
      alert("Please enter a task and select a date.");
      return;
    }

    tasks.push({ text: taskText, date: taskDate, completed: false });

    input.value = "";
    dateInput.value = "";

    renderTasks();
  });

  // 🔹 Complete / Delete Task
  list.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
      const index = e.target.dataset.index;
      tasks.splice(index, 1); // remove task
    } else if (e.target.classList.contains("complete")) {
      const index = e.target.dataset.index;
      tasks[index].completed = !tasks[index].completed; // toggle completed
    }
    renderTasks();
  });

  // 🔹 Filter Tasks (search by text)
  filter.addEventListener("keyup", () => {
    const search = filter.value.toLowerCase();
    const filtered = tasks.filter(task =>
      task.text.toLowerCase().includes(search)
    );

    list.innerHTML = "";
    if (filtered.length === 0) {
      list.innerHTML = `<tr><td colspan="4" class="no-task">No tasks found</td></tr>`;
      return;
    }

    filtered.forEach((task, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${task.text}</td>
        <td>${task.date}</td>
        <td>${task.completed ? "✅ Completed" : "⏳ Pending"}</td>
        <td>
          <button class="complete" data-index="${index}">✔</button>
          <button class="delete" data-index="${index}">🗑</button>
        </td>
      `;
      list.appendChild(row);
    });
  });

  // 🔹 Delete All Tasks
  deleteAllBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all tasks?")) {
      tasks = [];
      renderTasks();
    }
  });

  // Initial Render
  renderTasks();

  // Theme switcher
const themeSelect = document.getElementById("theme-select");

// Load saved theme or set default
const savedTheme = localStorage.getItem("theme") || "dark";
document.body.className = savedTheme + "-theme";
themeSelect.value = savedTheme;

// Change theme when user selects
themeSelect.addEventListener("change", () => {
  const theme = themeSelect.value;
  document.body.className = theme + "-theme";
  localStorage.setItem("theme", theme); // save preference
});

const runner = document.querySelector(".cursor-runner");
document.addEventListener("mousemove", (e) => {
  runner.style.left = e.pageX + "px";
  runner.style.top = e.pageY + "px";
});

// 🔹 Real-time Clock & Date
function updateClock() {
  const now = new Date();

  // Jam:Menit:Detik
  const time = now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  // Hari + Tanggal
  const date = now.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  document.getElementById("time").textContent = time;
  document.getElementById("date").textContent = date;
}

// Update tiap detik
setInterval(updateClock, 1000);
updateClock(); // panggil pertama kali


});
