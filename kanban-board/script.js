let tasks = JSON.parse(localStorage.getItem("kanbanTasks")) || [];

function renderTasks() {
    document.getElementById("todo").innerHTML = "";
    document.getElementById("progress").innerHTML = "";
    document.getElementById("done").innerHTML = "";

    tasks.forEach(task => {
        const div = document.createElement("div");
        div.className = "task";
        div.draggable = true;
        div.dataset.id = task.id;

        div.innerHTML = `
        <strong>${task.title}</strong>
        <button onclick="deleteTask(${task.id})">Delete</button>
        `;

        addDragEvents(div);

        document.getElementById(task.status).appendChild(div);
    });
}

function addTask(status) {
    const title = prompt("Enter a task");

    if(!title) return;

    const newTask = {
        id: Date.now(),
        title,
        status
    };

    tasks.push(newTask);
    saveAndRender();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveAndRender();
}

function addDragEvents(task) {
    task.addEventListener("dragstart", () => {
        task.classList.add("dragging");
    });

    task.addEventListener("dragend", () => {
        task.classList.remove("dragging");
    });
}

document.querySelectorAll(".task-list").forEach(column => {
    column.addEventListener("dragover", e => {
        e.preventDefault();
        const dragging = document.querySelector(".dragging");
        if(dragging) column.appendChild(dragging);
    });

    column.addEventListener("drop", () => {
        const dragging = document.querySelector(".dragging");
        if(!dragging) return;

        const id = Number(dragging.dataset.id);
        const newStatus = column.id;

        tasks = tasks.map(task => 
            task.id === id ? {...task, status: newStatus} : task
        );

        saveAndRender();
    });
});

function saveAndRender() {
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
    renderTasks();
}

renderTasks();