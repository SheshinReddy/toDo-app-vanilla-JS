document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task, index) => displayTask(task, index));
}

function displayTask(task, index) {
    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");
    li.innerHTML = `
        <span onClick = "toggleComplete(${index})" class = "${task.completed ? "completed" : ""}" id=${index}>${task.text}</span>
        <span class="delete-btn" onClick = "deleteTask(${index})">Delete</span>
    `;
    taskList.appendChild(li);
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText === "") return ;

    const task = {
        text: taskText,
        completed: false
    }

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    displayTask(task, tasks.length - 1);

    taskInput.value = "";
}

function toggleComplete(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    refreshTasks();
}

function refreshTasks() {
    document.getElementById("taskList").innerHTML = "";
    loadTasks();
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("taks", JSON.stringify(tasks));
    refreshTasks();
}