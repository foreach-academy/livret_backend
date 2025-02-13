import transporter from "../utils/emailTransporter.js";
import oneHourFromNowTimer from "../utils/dateTime.js";
import generateToken from '../utils/token.js';

class EmailServices {
  
  async sendWelcomeEmail(user) {
    const mailOptions = {
      from: process.env.EMAIL_FROM_EMAILSENDER,
      to: user.email,
      subject: 'Bienvenue sur notre plateforme!',
      text: `Bonjour ${user.firstname} ${user.lastname}, bienvenue sur notre plateforme!`,
      html: `
        <p>Bonjour ${user.firstname} ${user.lastname},</p>
        <p>Bienvenue sur notre plateforme. Nous sommes ravis de vous compter parmi nous !</p>`,
    };
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email envoyé : ' + info.response);
    } catch (error) {
      console.error('Erreur d\'envoi de l\'email :', error);
    }
  }

  async sendLinkToResetPasswordEmail(user) {
    const resetToken = generateToken();
    const resetLink = `${process.env.FRONT_URL}/reset/password?token=${resetToken}`;
    const mailOptions = {
      from: process.env.EMAIL_FROM_EMAILSENDER,
      to: user.email,
      subject: 'Réinitialisation de votre mot de passe',
      text: `Bonjour ${user.firstname} ${user.lastname}, Voici le lien de réinitialisation de votre mot de passe : ${resetLink}`,
      html: ` 
        <p>Bonjour ${user.firstname} ${user.lastname},</p>
        <p>Voici le lien pour réinitialiser votre mot de passe :</p>
        <a href="${resetLink}">Cliquez ici pour réinitialiser votre mot de passe</a> 
        <p>Ce lien expirera dans 1 heure.</p>
      `,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      if (info) {
        user.reset_password_expires = oneHourFromNowTimer();
        user.reset_password_token = resetToken;
        await user.save();
      }
    } catch (error) {
      console.error("Erreur d'envoi de l'email :", error);
      throw error;
    }
  }
}

export default new EmailServices();
