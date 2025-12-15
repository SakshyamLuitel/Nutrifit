import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Express application
const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ============================================
// Security Middleware
// ============================================

// Helmet helps secure Express apps by setting various HTTP headers
app.use(helmet());

// ============================================
// CORS Configuration
// ============================================

const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// ============================================
// Body Parser Middleware
// ============================================

// Middleware to parse incoming JSON requests
app.use(express.json({ limit: '10mb' }));

// Middleware to parse incoming URL-encoded form data
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ============================================
// Request Logging Middleware (Development)
// ============================================

if (NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// ============================================
// Health Check Endpoint
// ============================================

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: NODE_ENV,
  });
});

// ============================================
// API Routes
// ============================================

// Import routes (uncomment when routes are created)
// import authRoutes from './routes/auth.js';
// import userRoutes from './routes/users.js';
// import nutritionRoutes from './routes/nutrition.js';

// Mount routes
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/nutrition', nutritionRoutes);

// ============================================
// 404 Not Found Handler
// ============================================

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.method} ${req.path} not found`,
    timestamp: new Date().toISOString(),
  });
});

// ============================================
// Global Error Handler
// ============================================

app.use((err, req, res, next) => {
  // Log error details (only in development)
  if (NODE_ENV === 'development') {
    console.error('Error:', err);
  }

  // Default error status and message
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Send error response
  res.status(status).json({
    status: 'error',
    message: NODE_ENV === 'development' ? message : 'Internal Server Error',
    ...(NODE_ENV === 'development' && { stack: err.stack }),
    timestamp: new Date().toISOString(),
  });
});

// ============================================
// Server Initialization
// ============================================

const server = app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║       Nutrifit Backend Server          ║
╚════════════════════════════════════════╝

✓ Server running on port ${PORT}
✓ Environment: ${NODE_ENV}
✓ CORS enabled for: ${process.env.CORS_ORIGIN || 'http://localhost:3000'}
✓ Health check available at: http://localhost:${PORT}/health

Press Ctrl+C to stop the server
  `);
});

// ============================================
// Graceful Shutdown
// ============================================

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// ============================================
// Unhandled Promise Rejection Handler
// ============================================

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

export default app;
