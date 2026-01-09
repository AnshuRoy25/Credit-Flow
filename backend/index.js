
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import config from './config/config.js';

// Import routes
import loginRouter from './routes/login.js';
import applyLoanRouter from './routes/apply-loan.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increased limit for phone data

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', loginRouter);
app.use('/api/loan', applyLoanRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Start server
const PORT = config.port || 5999;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});