import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import analyticsRouter from './routes/analytics.route';
import usersRouter from './routes/user.route';
import router from './routes/routes';
import connectDB from './config/db';

const app = express();

// 1. DATABASE CONNECTION
// We call this but handle the actual server start in index.ts/server.ts 
// to ensure DB is ready before accepting traffic.
connectDB();

// 2. GLOBAL MIDDLEWARE
app.use(express.json());

// 3. DYNAMIC CORS CONFIGURATION
// Allows local development AND your future production URL
const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL // Add this to your Render Environment Variables
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);
    
    // In production, you can be stricter, but for now, we allow localhost + FRONTEND_URL
    if (allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// 4. HEALTH CHECK
// Essential for Render to verify the container is running
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ 
    status: 'ok', 
    uptime: process.uptime(),
    timestamp: new Date().toISOString() 
  });
});

// 5. API ROUTES
app.use('/api/v1/analytics', analyticsRouter);
app.use('/api/v1/', [usersRouter, router]);

// 6. 404 HANDLER
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

// 7. GLOBAL ERROR HANDLER
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Global Error:', err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// 8. SERVER START LOGIC
// We place this here or in index.ts. 
// Render REQUIRES '0.0.0.0' to detect the port.
const PORT = process.env.PORT || 10000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`
    🚀 Server is running!
    📡 Port: ${PORT}
    🔗 URL: http://0.0.0.0:${PORT}
    -----------------------------------
    `);
  });
}

export default app;