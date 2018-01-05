
// JQUERY MATERIALIZE

$(document).ready(function() {
  $('select').material_select();


  $('select').on('change', function() {
        console.log($(this).val());
    });
});



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
// document.getElementById("categoryChoice").addEventListener("mouseup", selectCategory);

function selectCategory() {
  var e = document.getElementById("categoryChoice").firstChild;
  var value = e.options[e.selectedIndex].value;
  var text = e.options[e.selectedIndex].text;
  log(text);
}


// FONCTIONS PRINCIPALES
function addTask(taskName) {
  if (this.id == 'submitTask') {
    var newTask = new Task(document.getElementById("defineTask").value, new Date(), $('select').val(), false);
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
    var button = document.createElement('a');
    var icon = document.createElement('i');
    li.setAttribute('id', 'li-' + this.name);
    li.setAttribute('class', 'collection-item');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', 'checkbox-' + this.name);
    label.setAttribute('for', 'checkbox-' + this.name);
    label.setAttribute('id', 'label-' + this.name);
    label.textContent = this.name + " (" + new Date(this.date).toLocaleDateString() + " à " + new Date(this.date).toLocaleTimeString()+ ")";
    if (this.isDone) {
      label.style.textDecoration = "line-through";
      checkbox.checked = true;
    }
    icon.setAttribute('class', 'material-icons');
    icon.textContent = 'delete';
    button.setAttribute('id', 'button-' + this.name);
    button.setAttribute('class', 'waves-effect waves-teal btn-flat');
    button.appendChild(icon);
    li.appendChild(button);
    li.appendChild(checkbox);
    li.appendChild(label);
    
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

// CONVERSION MILLISECONDES EN FORMAT DATE (piqué sur stackoverflow)
function msToHMS(ms) {
    var seconds = ms / 1000;
    var hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
    seconds = seconds % 3600; // seconds remaining after extracting hours
    var minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
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


