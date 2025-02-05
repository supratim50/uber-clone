import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";

import connectToDB from './db/db.js';

import userRoute from "./routes/user.routes.js";
import cookieParser from 'cookie-parser';

connectToDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use('/user', userRoute)

export default app;