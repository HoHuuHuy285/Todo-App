const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("list");

// Function to create HTML for a task
function createTaskHTML(task) {
  return `
    <li ${task.isCompleted ? 'class="completed"' : ""}>
      <input type="checkbox" class="checkbox-container" ${
        task.isCompleted ? "checked" : ""
      } onchange="toggleCompletion(this)">
      <span>${task.taskName}</span>
      <button class="delete" onclick="removeTodo(this)">❌</button>
    </li>
  `;
}

// Function to remove a task
function removeTodo(buttonElement) {
  const listItem = buttonElement.closest("li");
  listItem.remove();

  // Update localStorage after removing a task
  updateLocalStorage();
}
// Function to toggle completion status
function toggleCompletion(checkbox) {
  listItem.classList.toggle("completed");

  // Update localStorage after toggling completion status
  updateLocalStorage();
}

// Function to update localStorage with the current task list
function updateLocalStorage() {
  const tasks = Array.from(document.querySelectorAll("#list li")).map((li) => {
    return {
      taskName: li.querySelector("span").innerText,
      isCompleted: li.classList.contains("completed"),
    };
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from localStorage and display them
function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    const tasks = JSON.parse(storedTasks);
    tasks.forEach((task) => {
      const html = createTaskHTML(task);
      todoList.insertAdjacentHTML("beforeend", html);
    });
  }
}

// Fetch tasks from API and display them
(async function getListTask() {
  const response = await fetch(
    "https://24140260-278e-4d9e-899c-daad5cfee0f0.mock.pstmn.io/tasks"
  );
  const data = await response.json();

  data.map((task) => {
    const html = createTaskHTML(task);
    todoList.insertAdjacentHTML("beforeend", html);
  });
})();

// Event listener for adding a new task
document.querySelector(".check").addEventListener("click", function (e) {
  e.preventDefault();
  const taskName = document.querySelector(".task").value;
  if (taskName.trim() !== "") {
    const newTask = {
      taskName,
      isCompleted: false,
    };
    const html = createTaskHTML(newTask);
    todoList.insertAdjacentHTML("beforeend", html);
    document.querySelector(".task").value = ""; // Clear the input field after adding a task

    // Update localStorage after adding a new task
    updateLocalStorage();
  }
});

// Load tasks from localStorage when the page is loaded
document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);
