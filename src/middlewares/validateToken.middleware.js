import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const validateToken = (req, res, next) => {
  const { token } = req.cookies;
  console.log(token);
  // comprobacion de si el token esta vacio
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  // comprobacion de si el token lo hemos generado nosotros
  jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    // el usuario lo guardamos en req.user para poder utilizarlo en el siguiente callback
    req.user = decoded;
    next();
  });
};
