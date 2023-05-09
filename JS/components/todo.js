const TodoListContainer = document.getElementById("todo-list")
const openTodoBtn = document.getElementById("open-todo-btn")
const closeTodoBtn = document.getElementById("close-todo-btn")
const form = document.getElementById("todo-list-form")
const todoInput = document.getElementById("todo-list-input")
const todoItemsListEl = document.getElementById("todo-item-list")

// Retrieve todos from local storage
const todos = JSON.parse(localStorage.getItem("todos")) || []

// Render todos to HTML
todos.forEach(todo => {
  const todoEl = createTodoElement(todo)
  todoItemsListEl.appendChild(todoEl)
})

// Event listeners
openTodoBtn.addEventListener("click", openTodoList)
closeTodoBtn.addEventListener("click", closeTodoList)
form.addEventListener("submit", addTodo)

// Functions
function openTodoList() {
  TodoListContainer.showModal()
  todoInput.focus()
  
}

function closeTodoList() {
  TodoListContainer.close()
  
}

function addTodo (e) {
  e.preventDefault()

  // Get input value
  const todo = todoInput.value

  // Validate input
  if(!todo) {
    alert("Please enter a task")
    return
  }

  // Create todo item
  const todoEl = createTodoElement(todo)
  todoItemsListEl.appendChild(todoEl)

  // Add todo to array and save to local storage
  todos.push(todo)
  localStorage.setItem("todos", JSON.stringify(todos))

  // Clear input
  todoInput.value = ""
}

function createTodoElement(todo) {
  const todoEl = document.createElement("div")
  todoEl.classList.add("todo-item")

  const todoContentEl = document.createElement("div")
  todoContentEl.classList.add("content")
  todoEl.appendChild(todoContentEl)

  const todoInputEl = document.createElement("input")
  todoInputEl.classList.add("todo-text")
  todoInputEl.type = "text"
  todoInputEl.value = todo
  todoInputEl.setAttribute("readonly", "readonly")
  todoContentEl.appendChild(todoInputEl)

  const todoActionsEl = document.createElement("div")
  todoActionsEl.classList.add("actions")

  const todoEditEl = document.createElement("button")
  todoEditEl.classList.add("edit-btn")
  todoEditEl.innerHTML = "Edit"

  const todoDeleteEl = document.createElement("button")
  todoDeleteEl.classList.add("delete-btn")
  todoDeleteEl.innerHTML = "Delete"

  todoActionsEl.appendChild(todoEditEl)
  todoActionsEl.appendChild(todoDeleteEl)
  todoEl.appendChild(todoActionsEl)

  // Edit and delete handlers
  todoEditEl.addEventListener("click", () => {
    if (todoEditEl.innerText.toLowerCase() === "edit") {
      todoInputEl.removeAttribute("readonly")
      todoInputEl.focus()
      todoEditEl.innerText = "Save"
    } else {
      todoInputEl.setAttribute("readonly", "readonly")
      todoEditEl.innerText = "Edit"
    }
  })

  todoDeleteEl.addEventListener("click", () => {
    todoItemsListEl.removeChild(todoEl)

    // Remove todo from array and save to local storage
    const index = todos.indexOf(todo)
    if (index !== -1) {
      todos.splice(index, 1)
      localStorage.setItem("todos", JSON.stringify(todos))
    }
  })

  return todoEl
}

export { openTodoBtn }