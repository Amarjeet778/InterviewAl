import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connectdb.js'; // Import the connectDB function
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.routes.js';
import interviewRoutes from './routes/interview.route.js';
import paymentRoutes from './routes/payment.route.js';

dotenv.config();

const app = express();


app.use(cors({
  origin: 'https://interviewal-client.onrender.com', // Replace with your frontend URL
  credentials: true

}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/interview', interviewRoutes);
app.use('/api/payment', paymentRoutes);





app.get('/', (req, res) => {
  res.send('Hello World!');
});





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB(); // Call the connectDB function to connect to MongoDB
});
