
// MATERIALIZE COMPONENTS INITIALISATION
$(document).ready(function() {
  $('select').material_select();
  $('#selectCategory').on('change', function() {
    displayCategory();
  });
});


// VARIABLES GLOBALES
var taskStorage = localStorage;
if (JSON.parse(taskStorage.getItem("userStorage")) === null) { var taskArray = []; }
else { var taskArray = JSON.parse(taskStorage.getItem('userStorage')); }
if (JSON.parse(taskStorage.getItem("listStorage")) === null) { var listArray = ['Simplon', 'Administratif','Perso']; }
else { var listArray = JSON.parse(taskStorage.getItem('listStorage')); }


// REAFFICHAGE LISTE AU CHARGEMENT
window.onload = function() {
  for (var i in listArray) {
    var newList = new List(listArray[i]);
    newList.add();
  }
  $('.carousel').carousel({fullWidth: true});
  for (var i in taskArray) {
    taskArray[i].date = new Date(taskArray[i].date); 
    log('ici ' + taskArray[i].category);
    addTask(taskArray[i].name, taskArray[i].category);
  }
}

// LISTENERS
document.getElementById("submitTask").addEventListener("click", addTask);
document.getElementById("todo").addEventListener("click", displayToDo);
document.getElementById("done").addEventListener("click", displayDone);
document.getElementById("alltasks").addEventListener("click", displayAll);


// GESTION DES TÂCHES
// (cf bas de page pour le constructeur de l'objet Task)
function addTask(taskName, category) {
  if (this.id == 'submitTask') {
    var newTask = new Task(document.getElementById("defineTask").value, new Date(), $('select').val(), false);
    taskArray.push(newTask);
    updateLocalStorage();
  }
  else {
    var newTask =  new Task(taskName, new Date(findTaskByName(taskName).date), category, findTaskByName(taskName).isDone);
  }
  newTask.add();
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
    // alert(dateDiff);
    Materialize.toast(dateDiff, 4000)
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

function displayCategory() {
  log('ici');
  document.getElementById('viewTasks').innerHTML = "";
  var arrayCategory = filterTasksByCategory(document.getElementById('selectCategory').value);
  for (var i in arrayCategory) {
    addTask(arrayCategory[i].name);
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
    return ("Validation tâche : "+ hours+" heures et "+minutes+" minutes.");
  } 

// FONCTIONS FILTRE ET RECHERCHE
function findTaskByName(name) {
  function findTask(thisTask) { 
    return thisTask.name == name;
  }
  return taskArray.find(findTask);
}

function filterTasksByCategory(category) {
  function filterTasks(thisTask) { 
    return thisTask.category == category;
  }
  return taskArray.filter(filterTasks);
}

// CONSTRUCTEUR DE L'OBJET TASK

var List = function(category) {
  var colors = ['amber', 'green','teal','blue','purple',];
  this.category = category;
  this.color = colors[listArray.indexOf(this.category)];
  this.add = function() {
    var href = ['#one!', '#two!','#three!','#four!','#five!',];
    var indexHref = listArray.indexOf(this.category);
    var carousel = document.getElementById('mainCarousel');
    var sliderItem = document.createElement('div');
    var ul = document.createElement('ul');
    sliderItem.setAttribute('class', 'carousel-item ' + this.color);
    sliderItem.setAttribute('href', href[indexHref]);
    ul.setAttribute('id', 'viewTasks-' + this.category);
    sliderItem.textContent = this.category;
    sliderItem.appendChild(ul);
    carousel.appendChild(sliderItem);

  }
  this.fill = function() {
    var arrayCategories = filterTasksByCategory(this.category);
    for (var i in arrayCategories) {
      addTask(arrayCategories[i].name);
    }
  }
}


var Task = function(name, date, category, checked) {
  this.name = name;
  this.date = date;
  this.category = category;
  this.isDone = checked;
  this.add = function() {
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
    label.textContent = this.name + " (" + new Date(this.date).toLocaleDateString('fr-FR') + " à " + new Date(this.date).toLocaleTimeString('fr-FR')+ ")";
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
    document.getElementById("viewTasks-" + this.category).appendChild(li);
    // document.getElementById("viewTasks").appendChild(li);
    // ajout des listeners
    var myCheckbox = document.getElementById('checkbox-' + this.name);
    myCheckbox.addEventListener("click", updateTasks);
    var myDeleteButton = document.getElementById('button-' + this.name);
    myDeleteButton.addEventListener("click", deleteTask); 
  }
}

//DEV
function log(truc) {
  console.log(truc);
}


