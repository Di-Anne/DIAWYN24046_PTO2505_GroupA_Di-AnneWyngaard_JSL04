import { initialTasks } from "./initialData.js";

// Wait until DOM is fully loaded
window.addEventListener("load", initTaskBoard);

/**
 * Creates a single task element in DOM
 * @param {Object} task - task object
 * @param {string} task.title - title of task object 
 * @returns {HTML element} The created task element
 */
function createTaskElement(task) {
  const taskElement = document.createElement('div');
  taskElement.className = "task-div";
  taskElement.textContent = task.title;

  taskElement.addEventListener("click", () => {
   openTaskModal(task);
  });
  return taskElement; 
}

/**
 * Finds the task container based on task status
 * @param {string} status - status of task object
 * @returns {HTML element|null} - returns task container of element or null if not found
 */
function getTaskContainerByStatus(status) {
  // Find the column based on task status
  const columnDiv = document.querySelector(`.column-div[data-status="${status}"]`);
  if (!columnDiv) {
    return null;
  }
  // Now get the task-container of that element 
  const taskContainer = columnDiv.querySelector('.task-container');
  return taskContainer;
}

/**
 * Remove all existing task elements from its task containers
 */
function clearExistingTasks() {
  document.querySelectorAll(".task-container").forEach((container) => {
    container.innerHTML = "";
  });
}

/**
 * Render tasks from initial tasks array to UI
 * @param {Array<Object>} initialTasks - Inital array with task objects
 * @param {string} task.status - Status of task object
 */
function renderTasks(initialTasks) {
  initialTasks.forEach(task => {
    const container = getTaskContainerByStatus(task.status);
    if (container) {
      const taskElement = createTaskElement(task);
      container.appendChild(taskElement);
    }
  });
}

/**
 * Opens task Modal
 * @param {Object} task - the task object to display in modal
 */
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

/**
 * Closes task Modal
 */
function closeTaskModal() {
  const modal = document.getElementById('task-modal');
  const closeBtn = document.getElementById("close-btn");

  closeBtn.addEventListener("click", () => {
    modal.close();
  });
}

/**
 * Initializes task boads and modal
 */
function initTaskBoard() {
  clearExistingTasks();
  renderTasks(initialTasks);
  closeTaskModal();
}



