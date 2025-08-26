import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config()

const app = express();
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.mongoose)
.then(() => {
    console.log("✅ DB connected");
})
.catch((error) => {
    console.log("❌ MongoDB connection error: ", error);
});

const PORT = process.env.PORT || 8000;

app.use(cors({
    origin : "http://localhost:5173",
    methods : [
        'GET',
        'POST',
        'DELETE',
        'PUT'],
    allowedHeaders : [
        'Content-Type',
        'Authorization',
        'Cache-Control',
        'Expires',
        'Pragma'
    ],
    credentials : true
}));

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));