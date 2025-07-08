import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import cors from 'cors';
import fileUpload from "express-fileupload";

import Routes from './routes/Routes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();
const aport = process.env.PORT || 4000;
const allowedOrigins = ['http://localhost:5173'];

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(fileUpload()); // Ensure this is before your routes


// Test route
app.get('/', (_, res) => {
  res.send("API Working fine");
});

// API routes
app.use('/api', Routes);

// Error middleware
app.use(notFound);
app.use(errorHandler);


// Start server
app.listen(aport, () => {
  console.log(`Server is running on port ${aport}`);
});

// DB connection
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB:', err);
});
