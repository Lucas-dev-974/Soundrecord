export function trouverValeurPourcentage(pourcentage, valeurTotale) {
  if (pourcentage < 0 || pourcentage > 100) {
    return "Le pourcentage doit être compris entre 0 et 100";
  }
  return (valeurTotale * pourcentage) / 100;
}

export function trouverPourcentage(valeurPartielle, valeurTotale) {
  // Assurez-vous que les valeurs sont des nombres positifs
  if (valeurPartielle < 0 || valeurTotale <= 0) {
    return "Les valeurs doivent être des nombres positifs";
  }

  // Calculez le pourcentage
  const pourcentage = (valeurPartielle / valeurTotale) * 100;

  return pourcentage;
}
