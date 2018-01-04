
// VARIABLES GLOBALES
var taskStorage = localStorage;
if (JSON.parse(taskStorage.getItem("userStorage")) === null) { var taskArray = []; }
else { var taskArray = JSON.parse(taskStorage.getItem('userStorage')); }


// REAFFICHAGE LISTE AU CHARGEMENT
window.onload = function() {
  document.getElementById('viewTasks').innerHtml = "";
  for (index in taskArray) {
    taskArray[index].date = new Date(taskArray[index].date);
    addTask(taskArray[index].name);
  }
}

// LISTENERS
document.getElementById("submitTask").addEventListener("click", addTask);
document.getElementById("todo").addEventListener("click", displayToDo);
document.getElementById("done").addEventListener("click", displayDone);
document.getElementById("alltasks").addEventListener("click", displayAll);


// FONCTIONS PRINCIPALES
function addTask(taskName) {
  if (this.id == 'submitTask') {
    var newTask = new Task(document.getElementById("defineTask").value, new Date(), "Simplon", false);
    taskArray.push(newTask);
    updateLocalStorage();
  }
  else {
    var newTask =  new Task(taskName, new Date(findTaskByName(taskName).date), "Simplon", findTaskByName(taskName).isDone);
  }
  newTask.draw();
}

function deleteTask() {
  if (confirm('Supprimer cette tâche ?')) {
    var taskToDelete = findTaskByName(this.id.split("-").splice(-1).toString()); 
    taskArray.splice(taskArray.indexOf(taskToDelete), 1);
    var liToDelete = document.getElementById('li-' + taskToDelete.name);
    liToDelete.remove();
    updateLocalStorage();
  }
}

function updateTasks(taskName) {
  var taskToUpdate = findTaskByName(this.id.split("-").splice(-1).toString());
  var thisLabel = document.getElementById('label-' + taskToUpdate.name);
  thisLabel.style.textDecoration == "line-through" ? thisLabel.style.textDecoration = "none" : thisLabel.style.textDecoration = "line-through";
  if (taskToUpdate.isDone == false) {
    taskToUpdate.isDone = true;
    var dateDiff = msToHMS((Date.now() - new Date(taskToUpdate.date).getTime()));
    alert(dateDiff);
  }
  else {
    taskToUpdate.isDone = false;
  }
  updateLocalStorage();
  
}


// FILTRES DES TÂCHES
function displayToDo() {
  displayAll();
  if (this.checked) {
    for (var i in taskArray) {
      if (document.getElementById('label-' + taskArray[i].name).style.textDecoration == "line-through") {
        document.getElementById('label-' + taskArray[i].name).style.display = "none";
        document.getElementById('button-' + taskArray[i].name).style.display = "none";
      }
    }
  }
}

function displayDone() {
  displayAll();
  if (this.checked) {
    for (var i in taskArray) {
      if (document.getElementById('label-' + taskArray[i].name).style.textDecoration != "line-through") {
        document.getElementById('label-' + taskArray[i].name).style.display = "none";
        document.getElementById('button-' + taskArray[i].name).style.display = "none";
      }
    }
  }
}

function displayAll() {
  for (var i in taskArray) {
    var myTask = document.getElementById('label-' + taskArray[i].name);
    var myButton = document.getElementById('button-' + taskArray[i].name);
    myTask.style.display = "inline";
    myButton.style.display = "inline";
  }
}

// OBJET TASK
var Task = function(name, date, category, checked) {
  this.name = name;
  this.date = date;
  this.category = category;
  this.isDone = checked;
  this.draw = function() {
    var li = document.createElement('li');
    var label = document.createElement('label');
    var checkbox = document.createElement('input');
    var button = document.createElement('button');
    li.setAttribute('id', 'li-' + this.name);
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', 'checkbox-' + this.name);
    label.setAttribute('for', 'checkbox-' + this.name);
    label.setAttribute('id', 'label-' + this.name);
    label.textContent = this.name + " (" + new Date(this.date).toLocaleDateString() + " à " + new Date(this.date).toLocaleTimeString()+ ")";
    if (this.isDone) {
      label.style.textDecoration = "line-through";
      checkbox.checked = true;
    }
    button.setAttribute('id', 'button-' + this.name);
    button.textContent = "Delete";
    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(button);
    document.getElementById("viewTasks").appendChild(li);
   
    // ajout des listeners
    var myCheckbox = document.getElementById('checkbox-' + this.name);
    myCheckbox.addEventListener("click", updateTasks);
    var myDeleteButton = document.getElementById('button-' + this.name);
    myDeleteButton.addEventListener("click", deleteTask); 
  }
}

// ACTUALISATION LOCALSTORAGE
function updateLocalStorage() {
  if (taskArray.length != 0) {taskStorage.setItem('userStorage', JSON.stringify(taskArray));}
  else {taskStorage.removeItem('userStorage');}
}

// CONVERSION MILLISECONDES EN FORMAT DATE
function msToHMS(ms) {
    // 1- Convert to seconds:
    var seconds = ms / 1000;
    // 2- Extract hours:
    var hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
    seconds = seconds % 3600; // seconds remaining after extracting hours
    // 3- Extract minutes:
    var minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
    // 4- Keep only seconds not extracted to minutes:
    seconds = Math.round(seconds % 60);
    return ("Vous avez réalisé cette tâche en "+ hours+" heures, "+minutes+" minutes et "+seconds+" secondes.");
  } 

// RECHERCHE OBJET PAR PROPRIÉTÉ NOM
function findTaskByName(nameTask) {
  // mise à jour des propriétés de l'objet Task
  function findTask(thisTask) { 
    return thisTask.name == nameTask;
  }
  return taskArray.find(findTask);
}


//DEV
function log(truc) {
  console.log(truc);
}


