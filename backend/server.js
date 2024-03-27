const http = require('http');
const app = require('./app');

/**
 * renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaine, soit il renvoie false;
 * Utiliser pour définir la constante port qui sera assigné à la variable 'port' de l'app avec la fonction set()
 * @param {*} val 
 * @returns false, port, val
 */
const normalizePort = val => {
     const port = parseInt(val, 10);

     if (isNaN(port)) {
          return val;
     }

     if (port >= 0) {
          return port;
     }

     return false;
};

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port)

/**
 * Recherche les différentes erreurs et les gère de manière appropriée.
 * Elle est ensuite enregistrée dans le serveur ave la méthode on() du serveur qui a été créé par la méthode createServer() du module http.
 * @param {*} error 
 */
const errorHandler = error => {
     if (error.syscall !== 'listen') {
          throw error;
     }

     const address = server.address();
     const bind = typeof address === 'string' ? 'pipe' + address : 'port:' + port;
     switch (error.code) {
          case 'EACCES':
               console.error(bind + ' requires elevated privileges.');
               process.exit(1);
               break;
          case 'EADDRINUSE':
               console.error(bind + ' is already in use.');
               process.exit(1);
               break;
          default:
               throw error;
     }
}

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
     const address = server.address();
     const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
     console.log('Listening on ' + bind);
})

server.listen(port);