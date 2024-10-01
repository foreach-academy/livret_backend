const nodemailer = require('nodemailer');


// Configurer le transporteur avec le service Gmail et ton mot de passe d'application
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.user_email,// Ton adresse Gmail
    pass: process.env.user_password, // Le mot de passe d'application généré par Google
  },
});

// Fonction pour envoyer un email
async function sendEmail(user) {
  const mailOptions = {
    from: 'tassinbrandon7@gmail.com', // Ton adresse Gmail
    to: user.email,  // L'adresse email du destinataire
    subject: 'Bienvenue sur notre plateforme!', // le sujet de l'email
    text: `Bonjour ${user.first_name}  ${user.surname}, bienvenue sur notre plateforme!`, // le titre de l'email
    html: `
    <p>Bonjour ${user.first_name}  ${user.surname},</p>
    <p>Bienvenue sur notre plateforme. Nous sommes ravis de vous compter parmi nous !</p>`, // le contenu de l'email
  };
    // function pour envoiyer l'email et gestion des error 
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email envoyé : ' + info.response);
  } catch (error) {
    console.error('Erreur d\'envoi de l\'email :', error);
  }
}

module.exports = sendEmail;