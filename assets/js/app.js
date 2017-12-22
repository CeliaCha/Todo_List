var taskList = [];

// Listener du bouton ajouter
document.getElementById("submitTask").addEventListener("click", addTask);

// appelée quand une checkbox est cochée
function updateTasks() {
  var indexTask = this.id[this.id.length - 1] - 1;
  var myLabels = document.getElementsByTagName("label");
  log(indexTask);
  myLabels[indexTask].style.textDecoration == "line-through" ? myLabels[indexTask].style.textDecoration = "none" : myLabels[indexTask].style.textDecoration ="line-through";
}

// appelée par bouton ajouter
function addTask() {
  // ajout objet Task
  var taskName = document.getElementById("defineTask").value;
  var newTask = new Task(taskName, new Date(), "Simplon");
  taskList.push(newTask);

  // ajout dans le DOM
  var li = document.createElement('li');
  var label = document.createElement('label');
  var checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('class', 'checklist');
  checkbox.setAttribute('id', 'check' + taskList.length);
  label.setAttribute('for', 'check' + taskList.length);
  label.textContent = newTask.name;
  li.appendChild(checkbox);
  li.appendChild(label);
  document.getElementById("tasklist").appendChild(li);

  // Ajoute un listener sur chaque nouveau checkbox
  var myCheckboxes = document.getElementsByClassName("checklist");
  myCheckboxes[taskList.length - 1].addEventListener("click", updateTasks);
}

// Objet Task
var Task = function(name, date, category) {
  this.name = name;
  this.date = date;
  this.category = category;
  this.isDone = false;
}









//DEV
function log(truc) {
  console.log(truc);
}
