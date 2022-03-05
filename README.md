# Groupomania - Open Classrooms's School Project

Final project before graduate, this is about a social network of Groupomania enterprise. *( MVP version )*

# Installation ( FR )

**Installation du projet GitHub**

1. Executer la commande Git `git clone https://github.com/benysserp/Groupomania.git Groupomania`

2. Placer vous maintenant dans le dossier du projet via `cd Groupomania`

**Installation de la bdd SQL**

1. Créer une base de donnée `groupo_sql`

2. Importer le fichier SQL dans cette base de donnée `groupo_sql.sql`

**Installation back-end**

1. Se placer directement dans le dossier back de notre application via la commande : `cd back`

2. Executer l'installation des dépendences : `npm install`

3. Lancer notre server back-end via la commande : `node server`

**Installation front-end**

1. Se placer dans le dossier front de notre application via la commande : `cd front`

2. Executer l'installation des dépendences : `npm install`

3. Lancer notre application via la commande : `npm run start`

**Profitez du résau social Groupomania !**

# Rules

JavaScript must be use, front-end side we have to choose a framework & back-end side we have to use SQL Databases.

# Front side

I choosed the library `React`, and `Tailwind CSS` for all style part of the project.

To handle React states, i choosed `Recoil JS`. For the API request i use `axios`. And for the security routes i choose `React Router`.

# Back side

We choose `Node JS` and the framework `Express`, i don't use any ORM to communicate with database `SQL`

# Fonctionalities

**Register** page, and **Auth** page.

**User Profil** page, and possibilty to **edit, delete** his own profil.

**Publication** page, display publications, possibility to **post, edit & delete** user's publications.

Handle **Commentaries** linked to publications, user can **post, edit & delete** his own commentaries.

**Administrator Role** to moderate the forum, he can **delete** user's posts & commentaries.
