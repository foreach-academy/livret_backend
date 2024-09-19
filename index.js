const express = require("express");
const bodyParser = require('body-parser')
require('dotenv').config();

require('./Models/Joining');

const roleRouter = require('./routes/roleRoute')
const userRouter = require('./routes/userRoute')
const authenticateRouter = require('./routes/authenticateRoute')
const moduleRouter = require('./routes/moduleRoute')
const formationRouter = require('./routes/formationRoute')
const formation_moduleRouter = require('./routes/formation_moduleRoute')
const evaluationRouter = require('./routes/evaluationRoute')
const evaluationTypeRouter = require('./routes/evaluation_typeRoute')
const markRouter = require('./routes/markRoute')

const app = express();

const cors = require("cors");

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// app.get('/api/data', (req, res) => {
//     res.json({ message: 'Hello from server!' });
// });

app.use("/user", userRouter);
app.use("/role", roleRouter);
app.use("/authenticate", authenticateRouter);
app.use("/Module", moduleRouter);
app.use("/Formation", formationRouter);
app.use("/Formation_Module", formation_moduleRouter);
app.use("/Evaluation", evaluationRouter);
app.use("/Evaluation_Type", evaluationTypeRouter);
app.use("/Mark", markRouter);


module.exports = app;