# 📖 **INFORMATION SUR NODEMAILER** 📖

## 📧 Comment configurer NodeMailer pour envoyer des emails ?
Le projet utilise NodeMailer pour envoyer des emails à différents utilisateurs. Voici comment le configurer étape par étape. 🚀

## 🛠 Étape 1 : Remplir l’objet transporter
- Pour permettre à NodeMailer d’envoyer des emails, un objet transporter a été créé dans le fichier ```emailTransporter.js```. Il va contenir les informations du futur expéditeur.

## 📤 Étape 2 : Se connecter à votre boîte Gmail
- Connectez-vous à votre compte Gmail.

**Important :** Assurez-vous que votre compte utilise la **Vérification en deux étapes** (Two-Step Verification).
Cela est nécessaire pour générer un mot de passe spécifique à l’application.

## 🔒 Étape 3 : Générer un mot de passe pour l’application
- Rendez-vous dans les paramètres de votre compte Google, dans la section Sécurité.

- Cliquez sur Vérification en deux étapes et suivez les instructions pour l’activer (si ce n’est pas déjà fait).

- Une fois activée, recherchez l’encadré Mot de passe d'application et cliquez sur la flèche pour ouvrir la configuration.

- Saisissez un nom d'application (par exemple, "ForEach Livret").

- Cliquez sur Créer. Google générera un mot de passe spécifique à l’application (16 caractères).

- Dans le fichier ```.env```, ajouter une variable ```EMAIL_FROM_EMAILSENDER``` où vous mettez votre adresse Gmail et une variable ```PASSWORD_FROM_EMAILSENDER``` où vous écrivez le mot de passe de 16 caractères. 

Et voilà !
Vous avez configuré NodeMailer pour envoyer des emails via Gmail.