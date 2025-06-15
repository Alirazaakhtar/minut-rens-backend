const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // Token skal sendes som: Authorization: Bearer <token>
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Adgang nægtet: Mangler token' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Token ugyldig' });

    req.user = decoded; // decoded indeholder userId
    next(); //  Giv adgang
  });
};

module.exports = authenticateToken;