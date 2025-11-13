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







// Show modal and present prefilled-fields 
function openTaskModal(task) {
  const modal = document.getElementById('task-modal');
  const titleInput = document.getElementById('task-title');
  const descripInput = document.getElementById('task-descrip');
  const statusSelect = document.getElementById('task-status');

  titleInput.value = task.title;
  descripInput.value = task.description;
  statusSelect.value = task.status;

  modal.showModal();
}
