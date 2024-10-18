const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();

app.use(express.json());

app.use(cors());

// Routes
const roleRouter = require('./routes/roleRoute')
const userRouter = require('./Routes/userRoute')
const authenticateRouter = require('./routes/authenticateRoute')
const moduleRouter = require('./Routes/moduleRoute')
const formationRouter = require('./Routes/formationRoute')
const formation_moduleRouter = require('./routes/formation_moduleRoute')
const evaluationRouter = require('./routes/evaluationRoute')
const evaluationTypeRouter = require('./Routes/evaluation_typeRoute')
const evaluationResultatsRouter = require('./Routes/evaluationResultatRoute')
// const markRouter = require('./Routes/markRoute')
const emailRouter = require('./routes/EmailRoute')

app.use(cors({
    exposedHeaders: ['Retry-After'],  // Autorise Axios à lire cet en-tête
}));


// importer les relations
require('./Models/relations'); 


app.use((err, req, res, next) => {
    console.error('Erreur détaillée :', err); // Affiche l'erreur dans la console
    res.status(500).send('Something broke!');
}); 

app.use("/users", userRouter);
app.use("/role", roleRouter);
app.use("/authenticate", authenticateRouter);
app.use("/module", moduleRouter);
app.use("/formation", formationRouter);
app.use("/formation_module", formation_moduleRouter);
app.use("/evaluation", evaluationRouter);
app.use("/evaluation-type", evaluationTypeRouter);
app.use("/evaluation-resultat", evaluationResultatsRouter);
app.use("/email", emailRouter);


module.exports = app;