import nodemailer from 'nodemailer';

// Le transporter est une carte d'identité de l'expediteur
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_FROM_EMAILSENDER,
        pass: process.env.PASSWORD_FROM_EMAILSENDER,
    },
});

export default transporter