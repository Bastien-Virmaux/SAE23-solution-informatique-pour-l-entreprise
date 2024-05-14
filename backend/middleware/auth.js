const jwt = require('jsonwebtoken'); //importation de la librairie jsonwebtoken, qui permet de crée, signer et vérifier des JWT (un jwt est un format compact et autonome permettant de représenter des revendications entre deux parties de manière sécurisée sous forme de jetons.)

//définition d'une fonction en module. elle définie un middleware qui permet l'authentification des utilisateurs.
module.exports = (req, res, next) => { //exporte une fonction middleware comme un module
     try { //code qui sera exécuté si aucune exception est levée (si une est levée alors elle sera traité dans le bloc catch)
          const token = req.headers.authorization.split(' ')[1]; //extrait le jeton d'authentification de l'en-tête Authorization de la requête HTTP. (l'en-tête est sous la forme "Bearer <token>" => utilisation du split pour séparer les deux chaine de caractère et récupéré seulement le token)
          const decodedToken = jwt.verify(token, 'TOKEN_SECRET'); //utilise la fonction verify de la librairie jwt, qui permet de vérifier et décoder le jeton d'authentification. Le deuxième argument est la clé secrète utilisé pour signer le jeton
          const userId = decodedToken.userId; //extrait l'identifiant de l'utilisateur à partir des information décodées du jeton d'authentification

          req.auth = { userId }; //ajoute un objet auth contenant l'identifiant de l'utilisateur 

          if (req.body.userId && req.body.userId !== userId) { //vérifie si il y a un identifiant utilisateur dans la requête et vérifie si l'identifiant présent la requête correspond à l'identifiant trouvé lors du décodage du jeton. Si ça ne correspond pas on léve une erreur sinon on passe au prochain middleware. 
               throw 'Invalid user ID';
          } else {
               next();
          }
     } catch { //gestion des exceptions (erreurs)
          res.status(401).json({ error: new Error('Invalid request!') }); //si une erreur on renvoie un message ERREUR
     }
};