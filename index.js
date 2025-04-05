import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; 
import cors from 'cors';
import connectDB from './utils/db.js';
import userRouter from './routes/user.route.js';
import companyRouter from './routes/company.route.js';
dotenv.config();

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true
}
app.use(cors(corsOptions));

app.use('/api/v1/user', userRouter);
app.use('/api/v1/company', companyRouter);

connectDB();
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
