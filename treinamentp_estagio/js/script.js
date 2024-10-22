const taskForm = document.getElementById('todo-form');
const pendingTasksList = document.getElementById('pending-tasks');
const completedTasksList = document.getElementById('completed-tasks');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

taskForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('task-title').value;
    const desc = document.getElementById('task-desc').value;

    const newTask = {
        id: Date.now(),
        title: title,
        desc: desc,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskForm.reset();
});

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span><strong>${task.title}</strong>: ${task.desc}</span>
            <div>
                <button class="complete" onclick="toggleComplete(${task.id})">${task.completed ? 'Desmarcar' : 'Concluir'}</button>
                <button class="delete" onclick="deleteTask(${task.id})">Deletar</button>
            </div>
        `;
        if (task.completed) {
            completedTasksList.appendChild(taskItem);
        } else {
            pendingTasksList.appendChild(taskItem);
        }
    });
}

function toggleComplete(id) {
    tasks = tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task);
    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

renderTasks();

