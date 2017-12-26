var taskList = [];

// Listener du bouton ajouter
document.getElementById("submitTask").addEventListener("click", addTask);

// Listeners boutons radio du filtre
document.getElementById("todo").addEventListener("click", displayToDo);
document.getElementById("done").addEventListener("click", displayDone);
document.getElementById("alltasks").addEventListener("click", displayAll);

function displayToDo() {
  displayAll();
  if (this.checked) {
    for (i in taskList) {
      var myTask = document.getElementById('label' + taskList[i].name);
      if (myTask.style.textDecoration == "line-through") {
        myTask.style.display = "none";
      }
    }
  }
}

function displayDone() {
  displayAll();
  if (this.checked) {
    for (i in taskList) {
      var myTask = document.getElementById('label' + taskList[i].name);
      if (myTask.style.textDecoration != "line-through") {
        myTask.style.display = "none";
      }
    }
  }
}

function displayAll() {
  for (i in taskList) {
    var myTask = document.getElementById('label' + taskList[i].name);
    myTask.style.display = "inline";
  }
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
  checkbox.setAttribute('id', newTask.name);
  label.setAttribute('for', newTask.name);
  label.setAttribute('id', 'label' + newTask.name);
  label.textContent = newTask.name;
  li.appendChild(checkbox);
  li.appendChild(label);
  document.getElementById("tasklist").appendChild(li);

  // Ajoute un listener sur chaque nouveau checkbox
  var myCheckbox = document.getElementById(newTask.name);
  myCheckbox.addEventListener("click", updateTasks);
}


// appelée quand une checkbox est cochée
function updateTasks() {
  var thisLabel = document.getElementById('label' + this.id);
  thisLabel.style.textDecoration == "line-through" ? thisLabel.style.textDecoration = "none" : thisLabel.style.textDecoration = "line-through";
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
