const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.classList.add("task-item");
        if (task.completed) li.classList.add("completed");

        li.innerHTML = `
            <div>
                <strong>${task.text}</strong>
                <small>${task.date || ""}</small>
            </div>
            <div class="task-actions">
                <button onclick="toggleComplete(${index})">${task.completed ? "Undo" : "Done"}</button>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function addTask() {
    const text = taskInput.value.trim();
    const date = taskDate.value;

    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    tasks.push({ text, date, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = "";
    taskDate.value = "";
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function editTask(index) {
    const newText = prompt("Edit task:", tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

addTaskBtn.addEventListener("click", addTask);
renderTasks();
