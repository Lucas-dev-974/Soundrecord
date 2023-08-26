const publicRoutes = require("./public-route.json");

exports.publicPath = (req, res, next) => {
  let isPublic = false;
  console.log("is public:", isPublic);
  publicRoutes.routes.forEach((route) => {
    const args = route.split("|");
    const method = args[0];
    const url = args[1];
    
    if (
      (method == req.method && req.path.includes(url)) ||
      !req.token.error
    ) {
      isPublic = true;
    } else return res.status(401);
  });

  if (isPublic) next();
  else return res.status(401).json({ message: "Vous n'êtes pas autorisé" });
};
