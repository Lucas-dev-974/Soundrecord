const checkAutority = (req, res, next) => {
  if (req.path.includes("reset-password")) return next();

  if (req.method == "GET" && req.params.id) {
    if (req.user.id == req.params.id || req.user.role == 1) {
      return next();
    }
    return res.status(401).json({
      message: "vous n'êtes pas autorisé à récuperer cet ressource !",
    });
  }
  next();
};

exports.checkAutority = checkAutority;
