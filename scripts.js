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