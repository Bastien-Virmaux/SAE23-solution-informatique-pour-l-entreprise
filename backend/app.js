const express = require('express');
const bodyParser = require('body-parser'); //middleware body-parser de express
const mongoose = require('mongoose'); //importation de la librairie mongoose
const Ticket = require('./models/ticket'); //importation du schéma d'un ticket mongoDB
const app = express(); //instanciation d'express
const ticketRoutes = require('./routes/ticket'); //importation des routes
const userRoute = require('./routes/user');


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

//Permet d'analyser le corps des requêtes HTTP entrantes
app.use(bodyParser.json());

//middleware pour ajouter la route /api/ticket au route définie dans ticketRoutes
app.use('/api/auth', userRoute);
app.use('/api/ticket', ticketRoutes);

module.exports = app; //on donne la possibilité d'exporter la constante app qui contient l'instanciation d'express