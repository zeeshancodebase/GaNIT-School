const roleMiddleware = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
  }
  next();
};

module.exports = roleMiddleware;
