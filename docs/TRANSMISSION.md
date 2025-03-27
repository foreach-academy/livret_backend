## Ce qui a été réalisé dans le projet du 10/02/2025 au 28/03/2025 ##
- Réécriture de la base de donnée complète ( voir bdd-livret.sql)
- Réécriture des modèles Sequelize
- Réécriture des relations entre les modèles
- Création des routes, services et controlleurs training, promotion, module, module_promotion
- Ajout de middleware XSS
- Creation d'un errorHandler afin de centraliser le renvoi de message d'erreur vers le front

## Ce qui doit être améliorer ##

- Protection des routes en fonction de l'utilisateur basé sur le role du token
- Réécrire le mail automatique à l'inscription (par exemple lien vers la page mot de passe oublié)

## Ce qui doit être crée ##

- Modèles lié à apprenticeship, tutor, company 

> [!WARNING]La partie évaluation est assez complexe et demande encore de la réflexion sur l'approche a utiliser /!\ 
> - Revoir la base de donnée de la partie évaluation :
>    * Lors de la création d'une promotion, les modules_promotions sont automatiquement créés. A cela il faut ajouter une création automatique d'un objet évaluation. Cet objet sera complété par le formateur qui sera en charge de ce module. ( type d'évaluation) Une fois le type d'évaluation choisi par le formateur, un objet evaluation_user sera créé pour chaque user de la promotion (student_promotion)
>    * L'utilisation de la date du module_promotion doit être utilisé pour alerter et permettre l'ajout d'une évaluation. (Si mon module commence la semaine prochaine, alors l'évaluation devient possible a partir de la semaine prochaine)
>   * Lors de la création de la promotion, il serait interessant de créer l'objet apprentissage pour chaque étudiant. Nous partons du principe qu'un étudiant peut avoir plusieurs alternances au cours de sa formation ( changement de tuteur, changement d'entreprise)
