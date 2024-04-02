const express = require('express')
const router = express.Router(); //importation de la méthode router de express
const Ticket = require('../models/ticket'); //importation du schéma d'un ticket mongoDB
const ticketCtrl = require('../controllers/ticket'); //importation des controller (fonction) pour chaque méthode
const auth = require('../middleware/auth');

/*
 
DANS LA SUITE, différent middleware : 
 
POST => requête HTTP post pour enregistrer un élément
GET => requête HTTP get pour récupérer un élément
PUT => requête HTTP put pour modifier un élément
DELETE => requête HTTP delete pour supprimer un élément
 
*/

//middleware pour enregistré un ticket
router.post('/', auth, ticketCtrl.createTicket);

//middleware qui renvoie un tableau contenant tous les Tickets de notre BD (quand on va dans la page afficher les tickets).
router.get('/', auth, ticketCtrl.getAllTicket);

//middleware pour récupéré un ticket précisé dans l'url (au clique sur un ticket)
router.get('/:id', auth, ticketCtrl.getOneTicket);

//middleware pour modifier ticket précisé dans l'url (au clique sur un ticket)
router.put('/:id', auth, ticketCtrl.modifyTicket);

//middleware pour supprimé un ticket précisé dans l'url (au clique sur un ticket)
router.delete('/:id', auth, ticketCtrl.deleteTicket);


module.exports = router;