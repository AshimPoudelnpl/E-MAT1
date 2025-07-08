import jwt from 'jsonwebtoken';
import HttpError from '../models/ErrorModel.js';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  console.log('Auth header:', authHeader);  // Debug log

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error('JWT verification error:', err.message);
        return next(new HttpError('Not authorized, token failed', 401));
      }
      req.user = decoded;  // Attach decoded user info to req
      next();
    });
  } else {
    return next(new HttpError('Not authorized, no token', 401));
  }
};

export default authMiddleware;
