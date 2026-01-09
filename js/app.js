 let todos = [];
        let currentFilter = 'all';

        function addTodo() {
            const input = document.getElementById('todoInput');
            const dateInput = document.getElementById('dateInput');
            const text = input.value.trim();
            const date = dateInput.value;

            if (text === '') {
                alert('Mohon masukkan tugas!');
                return;
            }

            const todo = {
                id: Date.now(),
                text: text,
                date: date,
                completed: false
            };

            todos.push(todo);
            input.value = '';
            dateInput.value = '';
            renderTodos();
        }

        function toggleComplete(id) {
            todos = todos.map(todo => 
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            );
            renderTodos();
        }

        function deleteTodo(id) {
            todos = todos.filter(todo => todo.id !== id);
            renderTodos();
        }

        function filterTodos(filter) {
            currentFilter = filter;
            
            const buttons = document.querySelectorAll('.filter-btn');
            buttons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            
            renderTodos();
        }

        function renderTodos() {
            const todoList = document.getElementById('todoList');
            const emptyState = document.getElementById('emptyState');
            
            let filteredTodos = todos;
            
            if (currentFilter === 'active') {
                filteredTodos = todos.filter(todo => !todo.completed);
            } else if (currentFilter === 'completed') {
                filteredTodos = todos.filter(todo => todo.completed);
            }

            if (filteredTodos.length === 0) {
                todoList.style.display = 'none';
                emptyState.style.display = 'block';
                return;
            }

            todoList.style.display = 'block';
            emptyState.style.display = 'none';

            todoList.innerHTML = filteredTodos.map(todo => `
                <li class="todo-item ${todo.completed ? 'completed' : ''}">
                    <div class="todo-content">
                        <div class="todo-text">${todo.text}</div>
                        <div class="todo-date">${todo.date ? '📅 ' + formatDate(todo.date) : 'Tanpa tanggal'}</div>
                    </div>
                    <div class="todo-actions">
                        <button class="btn-complete" onclick="toggleComplete(${todo.id})">
                            ${todo.completed ? '↩️' : '✓'}
                        </button>
                        <button class="btn-delete" onclick="deleteTodo(${todo.id})">🗑️</button>
                    </div>
                </li>
            `).join('');
        }

        function formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString('id-ID', options);
        }

        document.getElementById('todoInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTodo();
            }
        });

        renderTodos();