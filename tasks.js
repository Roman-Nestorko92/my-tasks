const addItemsForm = document.getElementById("itemsForm");
const itemsList = document.getElementById("taskList");
const items = JSON.parse(localStorage.getItem("items")) || [];
const toggleTheme = document.getElementById("darksun");
const body = document.querySelector("body");

toggleTheme.onclick = function () {
  toggleTheme.classList.toggle("active");
  body.classList.toggle("active");
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
      <label for="item${index}">${task.text}</label>
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
