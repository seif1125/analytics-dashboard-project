import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import analyticsRouter from './routes/analytics.route';
import usersRouter from './routes/user.route';
import router from './routes/routes';
import connectDB from './config/db';

const app = express();

// 1. DATABASE CONNECTION
connectDB();

// 2. DYNAMIC CORS CONFIGURATION (MUST BE FIRST)
const allowedOrigins = [
  'http://localhost:5173',
  'https://analytics-dashboard-project.vercel.app', // Explicitly add for safety
  process.env.FRONTEND_URL 
].filter(Boolean) as string[];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      console.error(`CORS Blocked for origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// 3. HANDLE PREFLIGHT REQUESTS GLOBALLY
// This ensures that ALL routes respond correctly to the browser's "OPTIONS" request
app.options('*', cors());

// 4. BODY PARSING MIDDLEWARE (AFTER CORS)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 5. HEALTH CHECK (Before protected routes)
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ 
    status: 'ok', 
    uptime: process.uptime(),
    timestamp: new Date().toISOString() 
  });
});

// 6. API ROUTES
app.use('/api/v1/analytics', analyticsRouter);
app.use('/api/v1', usersRouter); // Separated for clarity
app.use('/api/v1', router);

// 7. 404 HANDLER
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

// 8. GLOBAL ERROR HANDLER
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // If it's a CORS error, send a specific response
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ error: 'CORS Error: Origin not allowed' });
  }

  console.error('Global Error Stack:', err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

// 9. SERVER START
const PORT = process.env.PORT || 10000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

export default app;