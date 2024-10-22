// /services/emailService.js

const nodemailer = require('nodemailer');
const crypto = require("crypto");
const xss = require('xss'); // Importer la bibliothèque xss

// Configurer le transporteur avec le service Gmail et ton mot de passe d'application
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.user_email, // Ton adresse Gmail
    pass: process.env.user_password, // Le mot de passe d'application généré par Google
  },
});

class EmailsServices {
  // Fonction pour envoyer un email de bienvenue
  async sendWelcomeEmail(user) {
    const cleanedFirstName = xss(user.first_name); // Nettoyer le prénom
    const cleanedSurname = xss(user.surname); // Nettoyer le nom de famille
    const mailOptions = {
      from: process.env.user_email, // Utiliser l'email configuré dans les variables d'environnement
      to: user.email, // L'adresse email du destinataire
      subject: 'Bienvenue sur notre plateforme!', // Sujet de l'email
      text: `Bonjour ${cleanedFirstName} ${cleanedSurname}, bienvenue sur notre plateforme!`, // Texte brut de l'email
      html: `
        <p>Bonjour ${cleanedFirstName} ${cleanedSurname},</p>
        <p>Bienvenue sur notre plateforme. Nous sommes ravis de vous compter parmi nous !</p>`, // Contenu HTML de l'email
    };

    // Fonction pour envoyer l'email et gérer les erreurs 
    try {
      const info = await transporter.sendMail(mailOptions); 
      console.log('Email envoyé : ' + info.response);
    } catch (error) {
      console.error('Erreur d\'envoi de l\'email :', error);
    }
  }

  // Fonction pour générer un token sécurisé
  generateResetToken() {
    return crypto.randomBytes(32).toString('hex'); // Génère un token aléatoire
  }

  // Fonction pour envoyer l'email de réinitialisation de mot de passe
  async sendLinkEmail(user) {
    const cleanedFirstName = xss(user.first_name); // Nettoyer le prénom
    const cleanedSurname = xss(user.surname); // Nettoyer le nom de famille
    const resetToken = this.generateResetToken(); 

    // Stocker le token et la date d'expiration dans la base de données (ex : 1 heure de validité)
    const tokenExpiration = new Date(Date.now() + 3600000); // +1 heure en UTC
    const franceTimezoneOffset = -new Date().getTimezoneOffset() * 60000; // Décalage horaire actuel pour la France
    const tokenExpirationInFrance = new Date(tokenExpiration.getTime() + franceTimezoneOffset); 
    user.resetPasswordExpires = tokenExpirationInFrance; // Stocker la date ajustée pour la France
    user.resetPasswordToken = resetToken;
    await user.save(); // Sauvegarder le token dans la base de données

    const resetLink = `http://127.0.0.1:3000/reset/password?token=${resetToken}`;
    const mailOptions = {
      from: process.env.user_email, // Utiliser l'email configuré dans les variables d'environnement
      to: user.email,
      subject: 'Réinitialisation de votre mot de passe',
      text: `Bonjour ${cleanedFirstName} ${cleanedSurname}, Voici le lien de réinitialisation de votre mot de passe : ${resetLink}`,
      html: `
        <p>Bonjour ${cleanedFirstName} ${cleanedSurname},</p>
        <p>Voici le lien pour réinitialiser votre mot de passe :</p>
        <a href="${resetLink}">Cliquez ici pour réinitialiser votre mot de passe</a>
        <p>Ce lien expirera dans 1 heure.</p>
      `,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email envoyé : ' + info.response);
    } catch (error) {
      console.error("Erreur d'envoi de l'email :", error);
      throw error;
    }
  }
}

module.exports = new EmailsServices();
