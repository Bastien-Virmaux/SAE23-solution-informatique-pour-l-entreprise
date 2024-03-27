const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({ //création du schéma pour un ticket
     title: { type: String, required: true },
     description: { type: String, required: true },
     imageUrl: { type: String, required: true },
     userId: { type: String, required: true },
     priority: { type: Number, required: true }
});

module.exports = mongoose.model('Ticket', ticketSchema); //on donne la possibilité d'exporter la constante app qui contient l'instanciation d'express