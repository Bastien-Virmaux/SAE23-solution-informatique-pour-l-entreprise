const express = require('express'); //importation du module express. Permet la simplification pour la création d'une application web en fournissant un ensemble de fonctionnalités pour gérer les routes, les requêtes HTTP, les réponses ...
const router = express.Router(); //création d'un objet router en utilisant la fonction Router proposé par express.Les routeurs sont utilisés pour définir des groupes de routes dans une application Express. Cela permet d'organiser les routes en fonction de leur fonctionnalité ou de leur contexte.
const ticketCtrl = require('../controllers/ticket');
const auth = require('../middleware/auth');
const Ticket = require('../models/ticket');

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