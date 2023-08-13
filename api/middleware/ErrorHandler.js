const errorHandler = (req, res, next) => {
  console.log("LERREUR DE LERREUR");
  console.error(req.user); // Vous pouvez enregistrer l'erreur ou effectuer d'autres actions de journalisation

  // Envoyer une réponse d'erreur
  return res
    .status(500)
    .json({ error: "Une erreur est survenue dans le serveur" });
};

exports.errorHandler = errorHandler;
