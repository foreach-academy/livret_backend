const express = require("express");
require('dotenv').config();

const roleRouter = require('./routes/roleRoute')
const userRouter = require('./routes/userRoute')
const authenticateRouter = require('./routes/authenticateRoute')
const moduleRouter = require('./routes/moduleRoute')
const formationRouter = require('./routes/formationRoute')
const formation_moduleRouter = require('./routes/formation_moduleRoute')
const evaluationRouter = require('./routes/evaluationRoute')
const evaluationTypeRouter = require('./routes/evaluation_typeRoute')
const markRouter = require('./routes/markRoute')
const emailRouter = require('./routes/EmailRoute')

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());



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
app.use("/evaluation_type", evaluationTypeRouter);
app.use("/mark", markRouter);
app.use("/email", emailRouter);


module.exports = app;