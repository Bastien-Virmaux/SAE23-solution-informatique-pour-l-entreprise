const mongoose = require('mongoose'); //importation de la librairie mongoose pour la modélisation d'objets MongoDB
const uniqueValidator = require('mongoose-unique-validator'); //plug-in pour mongoose, permet la validation des champs uniques (permet de rendre un champs unique comme une adresse mail, un nom, un prénom...), la gestion des erreurs de validation

//définition d'un schéma MongoDB pour les user
const userSchema = mongoose.Schema({ //crée un nouveau schéma Mongoose pour les users. Permet de définir la forme des documents qui seront enregistré dans une collection MongoDB
     email: { type: String, required: true, unique: true },
     password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema); //permet de définir un modèle mongoose pour les tickets via le schéma userSchema. Un modèle mongoose est une classe basé sur un schéma qui permet d'intéragir avec une collection mongoDB. En l'exportant, on permet à l'ensemble de l'app d'utilisé le schéma et donc le modèle et donc l'accès à la collection mongoDB.

//la définition (le nom) d'une collection se fait automatiquement par mongoDB en reprennant le nom du modéle, ici 'User' en enlevant la majuscule et en ajoutant un 's' => devient users