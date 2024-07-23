const express = require("express");

const roleRouter = require('./Routes/roleRoute')
const userRouter = require('./Routes/userRoute')

const app = express();

const cors = require("cors");

app.use(express.json());


app.use("/User", userRouter);
app.use("/Role", roleRouter);


module.exports = app;