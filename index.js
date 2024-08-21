const express = require("express");
const bodyParser = require('body-parser')
require('dotenv').config();


const roleRouter = require('./Routes/roleRoute')
const userRouter = require('./Routes/userRoute')
const authenticateRouter = require('./Routes/authenticateRoute')

const app = express();

const cors = require("cors");

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from server!' });
});

app.use("/User", userRouter);
app.use("/Role", roleRouter);
app.use("/authenticate", authenticateRouter);


module.exports = app;