const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Kun adgang for admin' });
  }
  next();
};

module.exports = authorizeAdmin;