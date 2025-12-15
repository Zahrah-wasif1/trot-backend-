import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: { id: string; role?: 'admin' | 'customer' };
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Unauthorized: No token' });

  try {
    const secret = process.env.JWT_SECRET || 'secret123';
    const decoded = jwt.verify(token, secret) as { id: string; role: 'admin' | 'customer' };
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
