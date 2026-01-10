import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import config from './config/config.js';

// Import routes
import loginRouter from './routes/login.js';
import applyLoanRouter from './routes/apply-loan.js';
import getApplicationsRouter from './routes/get-applications.js';

const app = express();

// CORS configuration for production
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://credit-flow-mvp.vercel.app'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', loginRouter);
app.use('/api/loan', applyLoanRouter);
app.use('/api/loan', getApplicationsRouter);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Keep-alive route (for preventing Render sleep)
app.get('/api/keep-alive', (req, res) => {
  res.status(200).json({ 
    status: 'alive',
    timestamp: new Date().toISOString()
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'CreditFlow Backend API',
    version: '1.0.0',
    status: 'running'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = config.port || 5999;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});