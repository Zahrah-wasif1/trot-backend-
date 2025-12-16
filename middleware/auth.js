const jwt = require('jsonwebtoken');

// Authentication middleware
const auth = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader ? authHeader.replace('Bearer ', '') : null;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'secret123';
    const decoded = jwt.verify(token, secret);
    // Attach user info to request
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = auth;
