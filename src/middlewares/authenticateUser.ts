import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
  user?: {
    iat: string;
    name: string;
  };
}

const authenticateUser = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.SECRET_KEY || '' , (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    if (typeof decoded === 'string' || typeof decoded === 'undefined') {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = { iat: String(decoded.iat), name: decoded.username };
    next();
  });
};

export default authenticateUser;
