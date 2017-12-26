## GH-Pages : https://celiacha.github.io/Todo_List/



# To Do List
Réaliser une todo list permettant d'ajouter des choses à se rappeler. Une fois qu'une chose est faite, la rayer. Rajouter la possibilité de n'afficher que les tâches faites, les tâches à faire ou toutes les tâches.

# Objectifs pédagogiques
* Traduire un besoin client en fonctionnalités techniques.
* Renforcer sa recherche d'informations autonome.
* Travailler avec Git.
* Se familiariser avec HTML, CSS/SASS, JS et Gulp.


# User stories
* En tant qu'utilisateur, je peux ajouter une tâche à faire.
* En tant qu'utilisateur, je peux définir une tâche comme faite.
* En tant qu'utilisateur, je peux filtrer la liste de tâches pour ne voir que les tâches faites.
* En tant qu'utilisateur, je peux filtrer la liste de tâches pour ne voir que les tâches à faire.
* En tant qu'utilisateur, je peux filtrer la liste de tâches pour voir toutes les tâches.

# Organisation:
```
  ├─assets/
  │ ├─js/
  │ └─scss/
  │   
  ├─index.html
  └─package.json
```

## NPM: Packages à installés:
* devDependencies:
	* Browser-sync,
	* Gulp,
	* Gulp-sass,
	* Gulp-clean-css,
	* Gulp-uglify,
	* merge-stream
* dependencies:
	* jQuery,(si Materialize)
	* Materialize-css (optionnel)

## Gulp
* Créer et configurer le fichier gulpfile.js
	* Les fichiers rendus par Gulp doivent se trouver dans un dossier `dist` à la racine du projet.
	* Si vous utilisez **Materialize**:
		* Il doit rendre le fichier minifié de jQuery dans `dist/js/`
		* Il doit rendre le fichier js minifié dans `dist/js/`
		* Il doit rendre le fichier css minifié dans `dist/css/`
	```
	├─assets/
	│ ├─js/
	│ └─scss/
	│
	├─dist/
	│ ├─js/
	│ └─css/
	│
	├─index.html
	└─package.json
	```

## Html
* Créer le squelette et ajouter les liens CSS/JS
* Créer un formulaire simple (form > input > bouton).
* Créer la base de la todo list (ul).

## SASS
* Ajouter du CSS pour enjoliver le site:
	* Centrer le titre de la page,
	* Changer la couleur de fond,
	* Mettre la police Open sans-serif,
	* Rayer les tâches faites.

## Javascript
* Ajouter du JS pour dynamiser le site:
	* Ajouter un message de bienvenue à l'ouverture de la page,
	* Ajouter un listener lors de la soumission du formulaire,
	* Récupérer le contenu de l'Input lors de la soumission du formulaire,
	* Ajouter la nouvelle tâche soumise via le formulaire dans la todo liste.


# Bonus
* Enregistrement des données dans le [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage),
* Afficher la date/heure de la création de chaque tâche,
* Quand la tâche est réalisé, afficher la différence de temps entre la création et la validation de la tâche,
* Supprimer une tâche (avec confirmation de suppression),
* Sauvegarder la todo list dans un fichier json,
* Possibilité de créer plusieurs listes et de les nommer,
* Ajout de listes en "favoris".

# Conseils
* Utiliser git en continu,
* Décomposer un problème en sous-problèmes,
* Dessiner et schématiser tous les problèmes,
* Step by step.
* [wireframe](https://img15.hostingpics.net/pics/862531Screenshotfrom20171220154348.png)
