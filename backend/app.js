const express = require('express');
const bodyParser = require('body-parser'); //middleware body-parser de express
const mongoose = require('mongoose'); //importation de la librairie mongoose
const Ticket = require('./models/ticket'); //importation du schéma d'un ticket mongoDB
const app = express(); //instanciation d'express

//middleware avec aucune ENDPOINT => s'applique à tout. Permet de donner les autorisation HTTP pour les requêtes entre le front et le back
app.use((req, res, next) => {
     res.setHeader('Access-Control-Allow-Origin', '*');
     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
     next();
})

//connexion à la BD mongoDB
mongoose.connect('mongodb://localhost:27017/mabase',
     {
          useNewUrlParser: true,
          useUnifiedTopology: true
     })
     .then(() => console.log('Connexion à MongoDB réussie !'))
     .catch(() => console.log('Connexion à MongoDB échouée !'));


//middleware pour mettre à disposition le json au req
app.use(express.json());

//middleware qui renvoi un tableau contenant tous les Tickets de notre BD (quand on va dans la page afficher les tickets).
app.use('/api/ticket', (req, res, next) => {
     Ticket.find() //la fonction find est une méthode pour récupérer tous les documents dans la collection associée au modèle. Dans ce cas, elle récupère tous les documents de la collection Ticket.
          .then(tickets => res.status(200).json(tickets)) //si aucune erreur on renvoie les tickets
          .catch(error => res.status(400).json({ error })); //si une erreur on renvoie un message ERREUR
});

//Permet d'analyser le corps des requêtes HTTP entrantes
app.use(bodyParser.json());

/*

DANS LA SUITE, différent middleware : 

POST => requête HTTP post pour enregistrer un élément
GET => requête HTTP get pour récupérer un élément
PUT => requête HTTP put pour modifier un élément
DELETE => requête HTTP delete pour supprimer un élément

*/

//middleware pour enregistré un ticket
app.post('/api/ticket', (req, res, next) => {
     delete req.body._id; //on supprime l'id de req car mongoose en génére un 
     const ticket = new Ticket({ //création d'un ticket à l'aide du modéle
          ...req.body //json
     });
     ticket.save() //enregistrement du ticket créé dans la BD
          .then(() => res.status(201).json({ message: 'Ticket enregistré !' })) //si aucune erreur on renvoie un message OK
          .catch(error => res.status(400).json({ error })); //si une erreur on renvoie un message ERREUR
});

//middleware pour récupéré un ticket précisé dans l'url (au clique sur un ticket)
app.get('/api/ticket/:id', (req, res, next) => {
     Ticket.findOne({ _id: req.params.id }) //la fonction findOne est une méthode pour trouver un seul document dans la collection associée au modèle. Dans ce cas, on recherche un document dont l'attribut _id correspond à la valeur de req.params.id. req.params.id extrait la valeur de :id de l'URL
          .then(ticket => res.status(200).json(ticket)) //si aucune erreur, on renvoie le ticket unique
          .catch(error => res.status(400).json({ error })); //si une erreur, on renvoie l'erreur
});

//middleware pour modifier ticket précisé dans l'url (au clique sur un ticket)
app.put('/api/ticket/:id', (req, res, next) => {
     Ticket.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) //la fonction updateOne est une méthode pour mettre à jour un document dans la collection associée au modèle. Dans ce cas, elle cherche un document avec l'attribut _id correspondant à la valeur de req.params.id dans l'URL, et met à jour ce document avec les données fournies dans req.body. L'objet { ...req.body, _id: req.params.id } contient à la fois les données à mettre à jour (dans req.body) et l'ID du document à mettre à jour. req.params.id extrait la valeur de :id de l'URL
          .then(() => res.status(200).json({ message: 'Ticket modifié !' })) // si aucune erreur, on renvoie le ticket modifé
          .cath(error => res.status(400).json({ error })); //si une erreur, on renvoie l'erreur
});

//middleware pour supprimé un ticket
app.delete('api/ticket/:id', (req, res, next) => {
     Ticket.deleteOne({ _id: req.params.id }) //la fonction deleteOne est une méthode pour supprimer un document dans la collection associée au modèle. Dans ce cas, elle cherche un document avec l'attribut _id correspondant à la valeur de req.params.id dans l'URL, et supprime ce document de la base de données
          .then(() => res.status(200).json({ message: 'Ticket supprimé !' })) // si aucune erreur, on renvoie le ticket supprimé
          .catch(error => res.status(400).json({ error })); //si une erreur, on renvoie l'erreur
});

module.exports = app; //on donne la possibilité d'exporter la constante app qui contient l'instanciation d'express