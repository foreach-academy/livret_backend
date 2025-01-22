const oneHourFromNowTimer = () => {
    // Définit la durée d'expiration du token (1 heure à partir de maintenant)
    const tokenExpiration = new Date(Date.now() + 3600000);

    // Calcule le décalage horaire pour le fuseau horaire de la France
    const franceTimezoneOffset = 60 * 60000;

    // Ajuste l'expiration du token pour le fuseau horaire de la France
    return new Date(tokenExpiration.getTime() + franceTimezoneOffset);

}

export default oneHourFromNowTimer