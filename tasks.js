const addItemsForm = document.getElementById("itemsForm");
const itemsList = document.getElementById("taskList");
const items = JSON.parse(localStorage.getItem("items")) || [];
const toggleTheme = document.getElementById("darksun");

const body = document.querySelector("body");
const titleh1 = document.getElementById("title");
const titleList = document.getElementById("titleList");
const buttonAdd = document.getElementById("buttonAdd");
const newTaskField = document.getElementById("newTask");

function applySavedTheme() {
  const savedTheme = localStorage.getItem("theme");
  const taskNumberElements = document.querySelectorAll(".task-number");
  if (savedTheme === "dark") {
    body.classList.add("active");
    titleh1.classList.add("active");
    titleList.classList.add("active");
    buttonAdd.classList.add("active");
    newTaskField.classList.add("active");
    taskNumberElements.forEach((element) => {
      element.classList.add("active");
    });
    const taskItemContent = document.querySelectorAll(".taskItemContent");
    taskItemContent.forEach((el) => {
      el.classList.add("active");
    });
    const customCheckBox = document.querySelectorAll(".custom-checkbox");
    customCheckBox.forEach((el) => {
      el.classList.add("active");
    });
    toggleTheme.classList.add("active");
  } else {
    body.classList.remove("active");
    titleh1.classList.remove("active");
    titleList.classList.remove("active");
    buttonAdd.classList.remove("active");
    newTaskField.classList.remove("active");
    taskNumberElements.forEach((element) => {
      element.classList.remove("active");
    });
    const taskItemContent = document.querySelectorAll(".taskItemContent");
    taskItemContent.forEach((el) => {
      el.classList.remove("active");
    });
    const customCheckBox = document.querySelectorAll(".custom-checkbox");
    customCheckBox.forEach((el) => {
      el.classList.remove("active");
    });
    toggleTheme.classList.remove("active");
  }
}

applySavedTheme();

toggleTheme.onclick = function () {
  toggleTheme.classList.toggle("active");
  const isActive = body.classList.toggle("active");
  titleh1.classList.toggle("active");
  titleList.classList.toggle("active");
  buttonAdd.classList.toggle("active");
  newTaskField.classList.toggle("active");
  const taskNumberElements = document.querySelectorAll(".task-number");
  taskNumberElements.forEach((element) => {
    element.classList.toggle("active");
  });
  const taskItemContent = document.querySelectorAll(".taskItemContent");
  taskItemContent.forEach((el) => {
    el.classList.toggle("active");
  });
  const customCheckBox = document.querySelectorAll(".custom-checkbox");
  customCheckBox.forEach((el) => {
    el.classList.toggle("active");
  });
  if (isActive) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
};

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
