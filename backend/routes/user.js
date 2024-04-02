const express = require('express')
const router = express.Router(); //importation de la méthode router de express
const User = require('../models/user'); //importation du schéma d'un user mongoDB
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);

router.post('/login', userCtrl.login);

module.exports = router;