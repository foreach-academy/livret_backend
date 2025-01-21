import express, { json } from "express";
import cors from "cors";

import roleRoute from './routes/roleRoute.js';
import authenticateRoute from './routes/authenticateRoute.js';
import formationRoute from './routes/formationRoute.js';
import moduleRoute from './routes/moduleRoute.js';
import evaluationRoute from './routes/evaluationRoute.js';
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

// route principal
app.use("/roles", roleRoute);
app.use("/users", userRoute);
app.use("/authenticate", authenticateRoute);
app.use("/formations", formationRoute);
app.use("/modules", moduleRoute);
app.use("/evaluations", evaluationRoute);
app.use("/emails", emailRoute);


export default app;