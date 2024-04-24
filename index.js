import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectToMongoDB from "./db/connectToMongoDb.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import multer from 'multer'


dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 8000;
app.use(cookieParser());
const form = multer()
app.use(form.array())
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.);
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});