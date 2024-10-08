// Module to handle localStorage
const Storage = {
    getTasks: () => JSON.parse(localStorage.getItem('tasks')) || [],
    saveTasks: (tasks) => localStorage.setItem('tasks', JSON.stringify(tasks)),
};

// Module to manipulate DOM
const DOM = {
    taskList: document.getElementById('task-list'),
    newTaskInput: document.getElementById('new-task'),
    errorMessage: document.getElementById('error-message'),

    addTaskToDOM(task, index) {
        const li = document.createElement('li');
        li.className = 'flex justify-between items-center bg-blue-50 p-2 rounded-lg shadow';
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}" contenteditable="false">${task.text}</span>
            <div class="space-x-2">
                <!-- Complete Button with Lucide Check Icon -->
                <button class="bg-green-500 text-white px-1.5 py-2 rounded complete-task" data-index="${index}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list-check">
                        <path d="M11 18H3"/>
                        <path d="m15 18 2 2 4-4"/>
                        <path d="M16 12H3"/>
                        <path d="M16 6H3"/>
                    </svg>
                </button>

                <!-- Edit Button with Lucide Edit Icon -->
                <button class="bg-yellow-500 text-white px-1.5 py-2 rounded edit-task" data-index="${index}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil">
                        <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>
                    </svg>
                </button>

                <!-- Delete Button with Lucide Trash Icon -->
                <button class="bg-red-500 text-white px-1.5 py-2 rounded delete-task" data-index="${index}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2">
                        <path d="M3 6h18"/>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                        <line x1="10" x2="10" y1="11" y2="17"/>
                        <line x1="14" x2="14" y1="11" y2="17"/>
                    </svg>
                </button>
            </div>
        `;

        // Complete task event
        li.querySelector('.complete-task').addEventListener('click', () => App.toggleTaskComplete(index));

        // Edit task event
        li.querySelector('.edit-task').addEventListener('click', () => App.editTask(index));

        // Delete task event
        li.querySelector('.delete-task').addEventListener('click', () => App.deleteTask(index));

        this.taskList.appendChild(li);
    },

    displayTasks(tasks) {
        this.taskList.innerHTML = '';
        tasks.forEach((task, index) => this.addTaskToDOM(task, index));
    },

    clearInput() {
        this.newTaskInput.value = '';
    },

    showErrorMessage() {
        this.errorMessage.classList.remove('hidden');
    },

    hideErrorMessage() {
        this.errorMessage.classList.add('hidden');
    }
};

// Module for the core app logic
const App = {
    tasks: Storage.getTasks(),

    init() {
        DOM.displayTasks(this.tasks);
        document.getElementById('add-task').addEventListener('click', () => this.addTask());
    },

    addTask() {
        const taskText = DOM.newTaskInput.value.trim();
        if (taskText === '') {
            DOM.showErrorMessage();
            return;
        }

        this.tasks.push({ text: taskText, completed: false });
        Storage.saveTasks(this.tasks);
        DOM.hideErrorMessage();
        DOM.clearInput();
        DOM.displayTasks(this.tasks);
    },

    toggleTaskComplete(index) {
        this.tasks[index].completed = !this.tasks[index].completed;
        Storage.saveTasks(this.tasks);
        DOM.displayTasks(this.tasks);
    },

    editTask(index) {
        const taskText = prompt('Edit your task:', this.tasks[index].text);
        if (taskText !== null && taskText.trim() !== '') {
            this.tasks[index].text = taskText.trim();
            Storage.saveTasks(this.tasks);
            DOM.displayTasks(this.tasks);
        }
    },

    deleteTask(index) {
        this.tasks.splice(index, 1);
        Storage.saveTasks(this.tasks);
        DOM.displayTasks(this.tasks);
    }
};

// Initialize the app
App.init();
