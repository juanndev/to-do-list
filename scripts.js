// Simulação de banco de dados simples para armazenar usuários
let users = JSON.parse(localStorage.getItem('users')) || [];

// Função para verificar se o usuário está logado
function isAuthenticated() {
    return localStorage.getItem('authenticatedUser') !== null;
}

// Função para cadastrar um novo usuário
function signUp(username, password) {
    if (users.some(user => user.username === username)) {
        alert('Nome de usuário já existe!');
        return false;
    }
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Cadastro realizado com sucesso! Faça login para acessar suas tarefas.');
    return true;
}

// Função para fazer login do usuário
function login(username, password) {
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        localStorage.setItem('authenticatedUser', username);
        alert('Login realizado com sucesso!');
        renderTodoApp();
    } else {
        alert('Nome de usuário ou senha incorretos!');
    }
}

// Função para fazer logout do usuário
function logout() {
    localStorage.removeItem('authenticatedUser');
    alert('Você saiu da sua conta.');
    renderLoginForm();
}

// Função para renderizar o formulário de login/cadastro
function renderLoginForm() {
    document.body.innerHTML = `
        <div class="container">
            <h1>Login</h1>
            <input type="text" id="username" placeholder="Nome de Usuário">
            <input type="password" id="password" placeholder="Senha">
            <button onclick="handleLogin()">Login</button>
            <p>Não tem uma conta? <a href="#" onclick="renderSignUpForm()">Cadastre-se</a></p>
        </div>
    `;
}

// Função para renderizar o formulário de cadastro
function renderSignUpForm() {
    document.body.innerHTML = `
        <div class="container">
            <h1>Cadastre-se</h1>
            <input type="text" id="newUsername" placeholder="Nome de Usuário">
            <input type="password" id="newPassword" placeholder="Senha">
            <button onclick="handleSignUp()">Cadastrar</button>
            <p>Já tem uma conta? <a href="#" onclick="renderLoginForm()">Faça login</a></p>
        </div>
    `;
}

// Função para lidar com o processo de cadastro
function handleSignUp() {
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;
    if (username && password) {
        if (signUp(username, password)) {
            renderLoginForm();
        }
    } else {
        alert('Preencha todos os campos!');
    }
}

// Função para lidar com o processo de login
function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username && password) {
        login(username, password);
    } else {
        alert('Preencha todos os campos!');
    }
}

// Função para renderizar a interface da To-Do List
function renderTodoApp() {
    document.body.innerHTML = `
        <div class="container">
            <h1>To-Do List</h1>
            <input type="text" id="taskInput" placeholder="Nova Tarefa">
            <button onclick="addTask()">Add Task</button>
            <ul id="taskList"></ul>
            <button onclick="logout()">Sair</button>
        </div>
    `;
    loadTasks();
}

// Função para carregar as tarefas do usuário autenticado
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerText = task;
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'X';
        deleteBtn.onclick = () => deleteTask(index);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// Função para adicionar uma nova tarefa
function addTask() {
    const taskInput = document.getElementById('taskInput').value;
    if (taskInput) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(taskInput);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
        document.getElementById('taskInput').value = '';
    } else {
        alert('Digite uma tarefa!');
    }
}

// Função para excluir uma tarefa
function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

// Inicializa a aplicação
function init() {
    if (isAuthenticated()) {
        renderTodoApp();
    } else {
        renderLoginForm();
    }
}

init();
