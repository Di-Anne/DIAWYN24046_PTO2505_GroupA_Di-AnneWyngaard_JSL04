import { initialTasks } from "./initialData.js";

/**
 * Creates a single task DOM element.
 * @param {Object} task 
 * @param {string} task.title 
 * @param {number} task.id 
 * @param {string} task.status 
 * @returns {HTMLElement} 
 */

function createTaskElement(task) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "task-div";
  taskDiv.textContent = task.title;
  taskDiv.dataset.taskId = task.id;

  taskDiv.addEventListener("click", () => {
    openTaskModal(task);
  });

  return taskDiv;
}

/**
 * Finds the task container element based on task status.
 * @param {string} status - 
 * @returns {HTMLElement|null} 
 */

function getTaskContainerByStatus(status) {
  const column = document.querySelector(`.column-div[data-status="${status}"]`);
  return column ? column.querySelector(".tasks-container") : null;
}

/*Clears all existing task-divs from all task containers.*/
function clearExistingTasks() {
  document.querySelectorAll(".tasks-container").forEach((container) => {
    container.innerHTML = "";
  });
}

/**
 * Shows all tasks from initial data to the UI.
 * Groups tasks by status and adds them to their respective columns.
 * @param {Array<Object>} tasks 
 */

function renderTasks(tasks) {
  tasks.forEach((task) => {
    const container = getTaskContainerByStatus(task.status);
    if (container) {
      const taskElement = createTaskElement(task);
      container.appendChild(taskElement);
    }
  });
}

/**
 * Opens the modal dialog with filled-in task details.
 * @param {Object} task 
 */
function openTaskModal(task) {
  const modal = document.getElementById("task-modal");
  const titleInput = document.getElementById("task-title");
  const descInput = document.getElementById("task-desc");
  const statusSelect = document.getElementById("task-status");

  titleInput.value = task.title;
  descInput.value = task.description;
  statusSelect.value = task.status;

  modal.showModal();
}


function setupModalCloseHandler() {
  const modal = document.getElementById("task-modal");
  const closeBtn = document.getElementById("close-modal-btn");

  closeBtn.addEventListener("click", () => {
    modal.close();
  });
}

/*Initializes the task board and modal handlers.*/
function initTaskBoard() {
  clearExistingTasks();
  renderTasks(initialTasks);
  setupModalCloseHandler();
}