const mongoose = require('mongoose'); //importation de la librairie mongoose pour la modélisation d'objets MongoDB

//définition d'un schéma MongoDB pour les tickets
const ticketSchema = mongoose.Schema({ //crée un nouveau schéma Mongoose pour les tickets. Permet de définir la forme des documents qui seront enregistré dans une collection MongoDB
     title: { type: String, required: true },
     description: { type: String, required: true },
     imageUrl: { type: String, required: true },
     userId: { type: String, required: true },
     priority: { type: Number, required: true }
});

module.exports = mongoose.model('Ticket', ticketSchema); //permet de définir un modèle mongoose pour les tickets via le schéma ticketSchema. Un modèle mongoose est une classe basé sur un schéma qui permet d'intéragir avec une collection mongoDB. En l'exportant, on permet à l'ensemble de l'app d'utilisé le schéma et donc le modèle et donc l'accès à la collection mongoDB.

//la définition (le nom) d'une collection se fait automatiquement par mongoDB en reprennant le nom du modéle, ici 'Ticket' en enlevant la majuscule et en ajoutant un 's' => devient tickets