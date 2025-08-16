let listContainer = document.getElementById("list");
let input = document.getElementById("input1");
let but = document.getElementById("but1");

// Add button click
but.addEventListener("click", function () {
  const task = input.value.trim();
  if (task === "") {
    alert("Add Your Task");
    return;
  }
  addTask(task);
  input.value = "";
  saveData();
});

// Add task function
function addTask(taskText) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = taskText;
  li.appendChild(span);

  const div = document.createElement("div");

  // Complete Button
  const completeButton = document.createElement("button");
  completeButton.textContent = "Complete";
  completeButton.className = "complete";
  completeButton.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveData(); // Update completed state in localStorage
  });
  div.appendChild(completeButton);

  // Edit Button
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.className = "edit";
  editButton.addEventListener("click", () => {
    const newTask = prompt("Edit your task:", span.textContent);
    if (newTask && newTask.trim() !== "") {
      span.textContent = newTask.trim();
      saveData();
    }
  });
  div.appendChild(editButton);

  // Delete Button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete";
  deleteButton.addEventListener("click", () => {
    li.remove();
    saveData();
  });
  div.appendChild(deleteButton);

  li.appendChild(div);
  listContainer.appendChild(li);
}

// Save to localStorage
function saveData() {
  localStorage.setItem("task", listContainer.innerHTML);
}

// Load from localStorage
function showData() {
  listContainer.innerHTML = localStorage.getItem("task");
  restoreButtonFunctionality();
}

// Reattach events to buttons after reloading HTML from localStorage
function restoreButtonFunctionality() {
  document.querySelectorAll("li").forEach((li) => {
    const buttons = li.querySelectorAll("button");
    const span = li.querySelector("span");

    buttons.forEach((btn) => {
      if (btn.className === "complete") {
        btn.addEventListener("click", () => {
          li.classList.toggle("completed");
          saveData();
        });
      }
      if (btn.className === "edit") {
        btn.addEventListener("click", () => {
          const newTask = prompt("Edit your task:", span.textContent);
          if (newTask && newTask.trim() !== "") {
            span.textContent = newTask.trim();
            saveData();
          }
        });
      }
      if (btn.className === "delete") {
        btn.addEventListener("click", () => {
          li.remove();
          saveData();
        });
      }
    });
  });
}

// Show saved data on page load
showData();