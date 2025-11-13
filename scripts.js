import { initialTasks } from "./initialData.js";

// Create one task element in the DOM
function createTaskElement(task) {
  const taskElement = document.createElement('div');
  taskElement.className = "task";
  taskElement.textContent = task.title;

  taskElement.addEventListener("click", () => {
   openTaskModal(task);
  });

  return taskElement; 
}

// Find the column for a given status of the task object
function getContainerByStatus(status) {
  // Find the column for the status
  const columnDiv = document.querySelector(`.column-div[data-status="${status}"]`);
  if (!columnDiv) {
    return null;
  }
  // Within that column, find the container that holds tasks
  const taskContainer = columnDiv.querySelector('.task-container');
  return taskContainer; 
}

// Remove all existing tasks from the board... WHY??


// Render all tasks into the correct columns
function renderTasks(initialTasks) {
  initialTasks.forEach(task => {
    const taskContainer = getContainerByStatus(task.status);
    if (container) {
      taskContainer.appendChild(createTaskElement(task));
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

function closeTaskModal(task) {
  const modal = document.getElementById('task-modal');
  const closeBtn = document.getElementById("close-modal-btn");

  closeBtn.addEventsListener("click", () => {
    modal.close();
  });
}

