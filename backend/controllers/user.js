const User = require('../models/user'); //importation du modèle USER
const bcrypt = require('bcrypt'); //importation de la librairie qui permet de hasher les password
const jwt = require('jsonwebtoken'); //importation de la librairie jsonwebtoken, qui permet de crée, signer et vérifier des JWT (un jwt est un format compact et autonome permettant de représenter des revendications entre deux parties de manière sécurisée sous forme de jetons.)

//définition d'une fonction signup => pour crée un compte
exports.signup = (req, res, next) => {
     bcrypt.hash(req.body.password, 10) //Utilisation de la fonction hash du module bcrypt pour hacher le mot de passe fourni dans la requête HTTP (req.body.password). Le deuxième argument 10 est le coût du hachage, qui détermine la complexité du calcul de hachage. 
          .then(hash => { //hash => mot de passe haché résultat si aucune erreur
               const user = new User({ //création d'une instance du modèle USER ave l'email récupérer par la requête et le password avec le hash final
                    email: req.body.email,
                    password: hash
               });
               user.save() //enregistrement de l'utilisation dans la BD mongodb 
                    .then(() => res.status(201).json({ message: "utilisateur crée !" })) //si aucune erreur renvoie un message OK
                    .catch(error => res.status(500).json(error)); //si une erreur on renvoie un message ERREUR
          })
          .catch(error => res.status(500).json({ error }));  //si une erreur on renvoie un message ERREUR
};

//définition d'une fonction login => pour se connecter à un compte
exports.login = (req, res, next) => {
     User.findOne({ email: req.body.email }) //la fonction findOne est une méthode pour trouver un seul document dans la collection associée au modèle. Dans ce cas, on recherche un document dont l'attribut email correspond à la valeur de req.body.email.
          .then(user => { //user => résultat de la recherhe avec la fonction findOne
               if (!user) { //si l'utilisateur n'est pas trouvé on renvoie une erreur
                    return res.status(401).json({ error: 'Utilisateur non trouvé' });
               }
               bcrypt.compare(req.body.password, user.password) //compare le mot de passe fournit (req.body.password) avec le mot de passe haché (user.password)
                    .then(valid => { //valid => booléen pour savoir si le mdp est correct ou pas 
                         if (!valid) { //si le mdp n'est pas valide, on renvoi une erreur
                              return res.status(401).json({ error: 'mot de passe incorrect !' });
                         }
                         res.status(200).json({ //si le mdp est valide on renvoie une réponse 200 et on envoie au format json, l'identifiant de l'utilisateur (user._id) et le jeton d'authentification généré via la libraire (jwt). Jeton signé avec une clé secrète (RANDOM_TOCKEN_SECRET) qui expire au bout de 24h
                              userId: user._id,
                              token: jwt.sign(
                                   { userId: user._id },
                                   'TOKEN_SECRET',
                                   { expiresIn: '24h' }
                              )
                         });
                    })
                    .catch(error => res.status(500).json({ error }));//si une erreur on renvoie un message ERREUR
          })
          .catch(error => res.status(500).json({ error }));//si une erreur on renvoie un message ERREUR
};