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

function haveModeratorAccess(req){
  if(!req.user) return false
  if(req.user.role == 1 || req.user.role == 2) return true
  else return false
}

function haveModeratorAdministratorAccess(req){
  if(!req.user) return false
  if(req.user.role == 1) return true
}

exports.checkAutority = checkAutority;
exports.haveModeratorAccess = haveModeratorAccess;
exports.haveModeratorAdministratorAccess = haveModeratorAdministratorAccess;
