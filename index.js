const express = require("express");

const userRouter = require('./Routes/userRoute')

const app = express();

const cors = require("cors");

app.use(express.json());


app.use("user", userRouter);