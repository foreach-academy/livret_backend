// /services/emailService.js
import nodemailer from 'nodemailer';
import crypto from "crypto";
import xss from 'xss'; // Importer la bibliothèque xss

// Configurer le transporteur avec le service Gmail et ton mot de passe d'application
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.user_email, // Ton adresse Gmail du fichier.env
    pass: process.env.user_password, // Le mot de passe d'application généré par Google du fichier.env
  },
});

class EmailsServices {
  // Fonction pour envoyer un email de bienvenue
  async sendWelcomeEmail(user) {
    const firstname = xss(user.first_name); // Nettoyer le prénom
    const lastname = xss(user.surname); // Nettoyer le nom de famille
    const mailOptions = {
      from: process.env.user_email, // Utiliser l'email configuré dans les variables d'environnement(fichier.env)
      to: user.email, // L'adresse email du destinataire
      subject: 'Bienvenue sur notre plateforme!', // Sujet de l'email
      text: `Bonjour ${firstname} ${lastname}, bienvenue sur notre plateforme!`, // Texte brut de l'email
      html: `
        <p>Bonjour ${firstname} ${lastname},</p>
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

    const { firstname, lastname } = user
    const resetToken = this.generateResetToken();

    const tokenExpiration = new Date(Date.now() + 3600000);
    const franceTimezoneOffset = -new Date().getTimezoneOffset() * 60000; // Décalage horaire actuel pour la France
    const tokenExpirationInFrance = new Date(tokenExpiration.getTime() + franceTimezoneOffset); // date du token en france +1h, pour avoir 1h avant expiration
    user.resetPasswordExpires = tokenExpirationInFrance; // Stocker la date ajustée pour la France
    user.resetPasswordToken = resetToken;
    await user.save(); // Sauvegarder le token dans la base de données

    const resetLink = `http://127.0.0.1:3000/reset/password?token=${resetToken}`; // stocker le lien de la page reset mot de passe qui se situe dans le front
    const mailOptions = {
      from: process.env.user_email, // Utiliser l'email configuré dans les variables d'environnement(fichier.env)
      to: user.email,
      subject: 'Réinitialisation de votre mot de passe',
      text: `Bonjour ${firstname} ${lastname}, Voici le lien de réinitialisation de votre mot de passe : ${resetLink}`,
      html: ` 
        <p>Bonjour ${firstname} ${lastname},</p>
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

export default new EmailsServices();
