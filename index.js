const express = require("express");
const roleRouter = require('./Routes/roleRoute')

const app = express();

const cors = require("cors");

app.use(express.json());

app.use("/Role", roleRouter);