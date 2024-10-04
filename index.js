const express = require("express");
const cors = require("cors");

// Importer les routeurs
const roleRouter = require('./routes/roleRoute');
const userRouter = require('./routes/userRoute');
const authenticateRouter = require('./routes/authenticateRoute');
const moduleRouter = require('./Routes/moduleRoute');
const formationRouter = require('./Routes/formationRoute');
const formation_moduleRouter = require('./routes/formation_moduleRoute');
const evaluationRouter = require('./routes/evaluationRoute');
const evaluationTypeRouter = require('./routes/evaluation_typeRoute');

// Importer les relations pour s'assurer qu'elles sont définies avant d'utiliser les routes
require('./Models/relations'); 

const app = express();
app.use(express.json());
app.use(cors());

// Définir les routes
app.use("/users", userRouter);
app.use("/role", roleRouter);
app.use("/authenticate", authenticateRouter);
app.use("/module", moduleRouter);
app.use("/formation", formationRouter);
app.use("/formation_module", formation_moduleRouter);
app.use("/evaluation", evaluationRouter);
app.use("/evaluation_type", evaluationTypeRouter);

module.exports = app;
