import express, { json } from "express";
import cors from "cors";

import roleRoute from './routes/roleRoute.js';
import authenticateRoute from './routes/authenticateRoute.js';
import formationRoute from './routes/formationRoute.js';
import moduleRoute from './routes/moduleRoute.js';
import formationModuleRoute from './routes/formationModuleRoute.js';
import evaluationRoute from './routes/evaluationRoute.js';
import evaluationTypeRoute from './routes/evaluationTypeRoute.js';
import evaluationResultatRoute from './routes/evaluationResultatRoute.js';
import emailRoute from './routes/emailRoute.js';
import userRoute from './routes/userRoute.js';

const app = express();

app.use(cors({
    exposedHeaders: ['Retry-After'],  // Autorise Axios à lire cet en-tête
}));
app.use(cors());
app.use(json());

// // Routes
// const emailRouter = require('./routes/EmailRoute')

// header pour le compte a rebours sur le front-end

// route principal
app.use("/users", userRoute);
app.use("/roles", roleRoute);
app.use("/authenticate", authenticateRoute);
app.use("/formations", formationRoute);
app.use("/modules", moduleRoute);
app.use("/formations_module", formationModuleRoute);
app.use("/evaluations", evaluationRoute);
app.use("/evaluations_type", evaluationTypeRoute);
app.use("/evaluations_resultat", evaluationResultatRoute);
app.use("/emails", emailRoute);


export default app;