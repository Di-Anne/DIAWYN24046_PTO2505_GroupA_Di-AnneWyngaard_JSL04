import { initialTasks } from "./initialData.js";

// Create one task element in the DOM
function createTaskElement(task) {
  const taskElement = document.createElement('div');
  taskElement.className = "task-div";
  taskElement.textContent = task.title;
  taskElement.dataset.taskId = task.id;

  taskElement.addEventListener("click", () => {
   openTaskModal(task);
  });

  return taskElement; 
}

// Find the column for a given status of the task object
function getTaskContainerByStatus(status) {
  // Find the column for the status
  const column = document.querySelector(`.column-div[data-status="${status}"]`);
  return column ? column.querySelector(".tasks-container") : null;
}

// Remove all existing tasks from the board... WHY??
function clearExistingTasks() {
  document.querySelectorAll(".task-container").forEach((container) => {
    container.innerHTML = "";
  });
}

// Render all tasks into the correct columns
function renderTasks(initialTasks) {
  initialTasks.forEach(task => {
    const container = getTaskContainerByStatus(task.status);
    if (container) {
      const taskElement = createTaskElement(task);
      container.appendChild(taskElement);
    }
  });
}


// Render modal and present prefilled-fields 
function openTaskModal(task) {
  const modal = document.getElementById('task-modal');
  const titleInput = document.getElementById('task-title');
  const descripInput = document.getElementById('task-descrip');
  const statusSelect = document.getElementById('task-status');

  titleInput.value = task.title;
  descripInput.value = task.description;
  statusSelect.value = task.status;
  // Built-in function to show modal and block rest of page
  modal.showModal();
}

function closeTaskModal() {
  const modal = document.getElementById('task-modal');
  const closeBtn = document.getElementById("close-modal-btn");

  closeBtn.addEventsListener("click", () => {
    modal.close();
  });
}

// Initializes the task board and modal handlers
function initTaskBoard() {
  clearExistingTasks();
  renderTasks(initialTasks);
  closeTaskModal();
}

// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", initTaskBoard);