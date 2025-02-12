import express, { json } from "express";
import cors from "cors";
import sequelize from './config/Sequelize.js';  // Import de la configuration Sequelize
import { setupRelations } from './models/relations.js';
import xssClean from 'xss-clean'

// Importer les modèles pour les initialiser
import './models/role.js';
import './models/user.js';
import './models/training.js';
import './models/promotion.js';
import './models/supervisorsPromotion.js';
import './models/trainersPromotion.js';
import './models/studientsPromotion.js';
import './models/module.js';
import './models/evaluationType.js';
import './models/moduleEvaluationType.js';
import './models/trainingModule.js';
import './models/evaluationResult.js';
import './models/evaluation.js';

// Configurer les relations
setupRelations();

// Synchroniser la base de données
(async () => {
    try {
        await sequelize.sync();  // Synchronisation des modèles
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing the database:', error);
    }
})();

// Configuration de l'application Express
const app = express();

app.use(cors({
    exposedHeaders: ['Retry-After'],  // Autorise Axios à lire cet en-tête
}));
app.use(cors());
app.use(json());
app.use(xssClean());

// Routes
import roleRoute from './routes/roleRoute.js';
import authenticateRoute from './routes/authenticateRoute.js';
import trainingRoute from './routes/trainingRoute.js';
import moduleRoute from './routes/moduleRoute.js';
import evaluationRoute from './routes/evaluationRoute.js';
import emailRoute from './routes/emailRoute.js';
import userRoute from './routes/userRoute.js';
import promotionRoute from './routes/promotionRoute.js';

app.use("/roles", roleRoute);
app.use("/users", userRoute);
app.use("/authenticate", authenticateRoute);
app.use("/trainings", trainingRoute);
app.use("/modules", moduleRoute);
app.use("/evaluations", evaluationRoute);
app.use("/emails", emailRoute);
app.use("/promotions", promotionRoute);

export default app;
