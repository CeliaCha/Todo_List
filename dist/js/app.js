
var taskStorage = localStorage;
if (JSON.parse(taskStorage.getItem("userStorage")) === null) { var taskArray = []; }
else { var taskArray = JSON.parse(taskStorage.getItem('userStorage')); }


window.onload = function() {
  document.getElementById('viewTasks').innerHtml = "";
    for (index in taskArray) {
      var taskName = taskArray[index].name;
      addTask(taskName);
    }
}

// LISTENERS
document.getElementById("submitTask").addEventListener("click", addTask);
document.getElementById("todo").addEventListener("click", displayToDo);
document.getElementById("done").addEventListener("click", displayDone);
document.getElementById("alltasks").addEventListener("click", displayAll);


// APPELÉE PAR BOUTON AJOUTER
function addTask(taskName) {
  // création objet Task s'il n'existe pas déjà
  if (this.id == 'submitTask') {
    var taskName = document.getElementById("defineTask").value;
    var newTask = new Task(taskName, new Date(), "Simplon");
    taskArray.push(newTask);
    updateLocalStorage();
  }
  else {
    var newTask = findTaskByName(taskName);
  }
  // ajout dans le DOM
  var li = document.createElement('li');
  var label = document.createElement('label');
  var checkbox = document.createElement('input');
  var button = document.createElement('button');
  li.setAttribute('id', 'li-' + newTask.name);
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('id', 'checkbox-' + newTask.name);
  label.setAttribute('for', 'checkbox-' + newTask.name);
  label.setAttribute('id', 'label-' + newTask.name);
  label.textContent = newTask.name + " (" + new Date(newTask.date).toLocaleDateString() + " à " + new Date(newTask.date).toLocaleTimeString()+ ")";
  button.setAttribute('id', 'button-' + newTask.name);
  button.textContent = "Delete";
  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(button);
  document.getElementById("viewTasks").appendChild(li);
  // Ajoute un listener sur chaque nouveau checkbox
  var myCheckbox = document.getElementById('checkbox-' + newTask.name);
  myCheckbox.addEventListener("click", updateTasks);
  // Ajoute un listener sur chaque nouveau bouton delete
  var myDeleteButton = document.getElementById('button-' + newTask.name);
  myDeleteButton.addEventListener("click", deleteTask); 
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

// APPELLÉE PAR CHECKBOXES
function updateTasks() {
  var taskToUpdate = findTaskByName(this.id.split("-").splice(-1).toString());
  log(taskToUpdate);
  if (taskToUpdate.isDone == false) {
    taskToUpdate.isDone = true;
    var dateDiff = msToHMS((Date.now() - taskToUpdate.date.getTime()));
    alert(dateDiff);
  }
  else {
    taskToUpdate.isDone = false;
  }
  // raye ou déraye les tâches 
  var thisLabel = document.getElementById('label-' + taskToUpdate.name);
  thisLabel.style.textDecoration == "line-through" ? thisLabel.style.textDecoration = "none" : thisLabel.style.textDecoration = "line-through";
}



// OBJET TASK
var Task = function(name, date, category) {
  this.name = name;
  this.date = date;
  this.category = category;
  this.isDone = false;
}


// FILTRES DES TÂCHES
function displayToDo() {
  displayAll();
  if (this.checked) {
    for (i in taskArray) {
      var myTask = document.getElementById('label-' + taskArray[i].name);
      if (myTask.style.textDecoration == "line-through") {
        myTask.style.display = "none";
      }
    }
  }
}
function displayDone() {
  displayAll();
  if (this.checked) {
    for (i in taskArray) {
      var myTask = document.getElementById('label-' + taskArray[i].name);
      if (myTask.style.textDecoration != "line-through") {
        myTask.style.display = "none";
      }
    }
  }
}
function displayAll() {
  for (i in taskArray) {
    var myTask = document.getElementById('label-' + taskArray[i].name);
    myTask.style.display = "inline";
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
  function findTask(thisTask) { 
    return thisTask.name == nameTask;
  }
  return taskArray.find(findTask);
}




//DEV
function log(truc) {
  console.log(truc);
}


