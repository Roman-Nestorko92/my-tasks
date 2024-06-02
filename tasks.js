const addItemsForm = document.getElementById("itemsForm");
const itemsList = document.getElementById("taskList");
const items = JSON.parse(localStorage.getItem("items")) || [];
const toggleTheme = document.getElementById("darksun");
const openModal = document.getElementById("openModal");
const modalBox = document.getElementById("modalBox");
const closeModal = document.getElementById("closeModal");

const body = document.querySelector("body");
const titleh1 = document.getElementById("title");
const titleList = document.getElementById("titleList");
const buttonAdd = document.getElementById("buttonAdd");
const newTaskField = document.getElementById("newTask");

openModal.onclick = function () {
  modalBox.style.display = "block";
};

closeModal.onclick = function () {
  modalBox.style.display = "none";
};

window.onclick = function (e) {
  if (e.target === modalBox) {
    modalBox.style.display = "none";
  }
};

function applySavedTheme() {
  const savedTheme = localStorage.getItem("theme");
  const taskNumberElements = document.querySelectorAll(".task-number");
  const taskItemContent = document.querySelectorAll(".taskItemContent");
  const customCheckBox = document.querySelectorAll(".custom-checkbox");

  if (savedTheme === "dark") {
    body.classList.add("active");
    titleh1.classList.add("active");
    titleList.classList.add("active");
    buttonAdd.classList.add("active");
    newTaskField.classList.add("active");
    taskNumberElements.forEach((element) => {
      element.classList.add("active");
    });
    taskItemContent.forEach((el) => {
      el.classList.add("active");
    });
    customCheckBox.forEach((el) => {
      el.classList.add("active");
    });
    toggleTheme.classList.add("active");
  } else {
    const taskItemContent = document.querySelectorAll(".taskItemContent");
    const customCheckBox = document.querySelectorAll(".custom-checkbox");
    body.classList.remove("active");
    titleh1.classList.remove("active");
    titleList.classList.remove("active");
    buttonAdd.classList.remove("active");
    newTaskField.classList.remove("active");
    taskNumberElements.forEach((element) => {
      element.classList.remove("active");
    });
    taskItemContent.forEach((el) => {
      el.classList.remove("active");
    });
    customCheckBox.forEach((el) => {
      el.classList.remove("active");
    });
    toggleTheme.classList.remove("active");
  }
}

toggleTheme.onclick = function () {
  toggleTheme.classList.toggle("active");
  const isActive = body.classList.toggle("active");
  const taskNumberElements = document.querySelectorAll(".task-number");
  const taskItemContent = document.querySelectorAll(".taskItemContent");
  const customCheckBox = document.querySelectorAll(".custom-checkbox");
  titleh1.classList.toggle("active");
  titleList.classList.toggle("active");
  buttonAdd.classList.toggle("active");
  newTaskField.classList.toggle("active");
  taskNumberElements.forEach((element) => {
    element.classList.toggle("active");
  });
  taskItemContent.forEach((el) => {
    el.classList.toggle("active");
  });
  customCheckBox.forEach((el) => {
    el.classList.toggle("active");
  });

  if (isActive) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }

  applySavedTheme();
};

applySavedTheme();

function addItem(e) {
  e.preventDefault();
  const taskText = e.target.item.value;

  const item = {
    text: taskText,
    checked: false,
  };

  items.push(item);
  localStorage.setItem("items", JSON.stringify(items));
  displayItems(items, itemsList);

  this.reset();
  modalBox.style.display = "none";
}

function removeFromList(idx) {
  items.splice(idx, 1);
  localStorage.setItem("items", JSON.stringify(items));
  displayItems(items, itemsList);
}

function displayItems(tasks, taskList) {
  taskList.innerHTML = tasks
    .map((task, index) => {
      return `<li class="taskItemBox">
      <div class="contentBoxItem">
      <span class="task-number">${index + 1}.</span>
      <label class="taskItemContent" for="item${index}">${task.text}</label>  
      
      </div>
      <div class="taskButtonsBox">      
      <input class="inputChecked" type="checkbox" id="item${index}" data-index="${index}" ${
        task.checked ? "checked" : ""
      } />
      <label class="custom-checkbox" for="item${index}"></label>
      <button class="removeButton" type="button" onClick="removeFromList(${index})">-</button>
      </div>
      </li>`;
    })
    .join("");
  applySavedTheme();
}

function toggleClick(e) {
  if (!e.target.matches("input")) return;
  const element = e.target.dataset.index;
  items[element].checked = !items[element].checked;
  localStorage.setItem("items", JSON.stringify(items));
  displayItems(items, itemsList);
}

addItemsForm.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleClick);
displayItems(items, itemsList);
