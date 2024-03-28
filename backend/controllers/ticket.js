const Ticket = require('../models/ticket'); //importation du schéma d'un ticket mongoDB

//définition d'une fonction createTicket
exports.createTicket = (req, res, next) => {
     delete req.body._id; //on supprime l'id de req car mongoose en génére un 
     const ticket = new Ticket({ //création d'un ticket à l'aide du modéle
          ...req.body //json
     });
     ticket.save() //enregistrement du ticket créé dans la BD
          .then(() => res.status(201).json({ message: 'Ticket enregistré !' })) //si aucune erreur on renvoie un message OK
          .catch(error => res.status(400).json({ error })); //si une erreur on renvoie un message ERREUR
}

//définition d'une fonction getAllTicket
exports.getAllTicket = (req, res, next) => {
     Ticket.find() //la fonction find est une méthode pour récupérer tous les documents dans la collection associée au modèle. Dans ce cas, elle récupère tous les documents de la collection Ticket.
          .then(tickets => res.status(200).json(tickets)) //si aucune erreur on renvoie les tickets
          .catch(error => res.status(400).json({ error })); //si une erreur on renvoie un message ERREUR
}

//définition d'une fonction getOneTicket
exports.getOneTicket = (req, res, next) => {
     Ticket.findOne({ _id: req.params.id }) //la fonction findOne est une méthode pour trouver un seul document dans la collection associée au modèle. Dans ce cas, on recherche un document dont l'attribut _id correspond à la valeur de req.params.id. req.params.id extrait la valeur de :id de l'URL
          .then(ticket => res.status(200).json(ticket)) //si aucune erreur, on renvoie le ticket unique
          .catch(error => res.status(400).json({ error })); //si une erreur, on renvoie l'erreur
}

//définition d'une fonction modifyTicket
exports.modifyTicket = (req, res, next) => {
     Ticket.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) //la fonction updateOne est une méthode pour mettre à jour un document dans la collection associée au modèle. Dans ce cas, elle cherche un document avec l'attribut _id correspondant à la valeur de req.params.id dans l'URL, et met à jour ce document avec les données fournies dans req.body. L'objet { ...req.body, _id: req.params.id } contient à la fois les données à mettre à jour (dans req.body) et l'ID du document à mettre à jour. req.params.id extrait la valeur de :id de l'URL
          .then(() => res.status(200).json({ message: 'Ticket modifié !' })) // si aucune erreur, on renvoie le ticket modifé
          .catch(error => res.status(400).json({ error })); //si une erreur, on renvoie l'erreur
}

//définition d'une fonction deleteTicket
exports.deleteTicket = (req, res, next) => {
     Ticket.deleteOne({ _id: req.params.id }) //la fonction deleteOne est une méthode pour supprimer un document dans la collection associée au modèle. Dans ce cas, elle cherche un document avec l'attribut _id correspondant à la valeur de req.params.id dans l'URL, et supprime ce document de la base de données
          .then(() => res.status(200).json({ message: 'Ticket supprimé !' })) // si aucune erreur, on renvoie le ticket supprimé
          .catch(error => res.status(400).json({ error })); //si une erreur, on renvoie l'erreur
}