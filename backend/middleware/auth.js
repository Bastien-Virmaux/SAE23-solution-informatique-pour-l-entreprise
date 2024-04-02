const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
     try {
          const token = req.header.authorization.split(' ')[1];
          const decodedToken = jwt.verify(token, 'TOKEN_SECRET');
          const userId = decodedToken.userId;

          req.auth = { userId };

          if (req.body.userId && req.body.userI !== userId) {
               throw 'Invalid user ID';
          } else {
               next();
          }
     } catch {
          res.status(401).json({ error: new Error('Invalid request!') });
     }
};