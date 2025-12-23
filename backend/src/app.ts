import express, { Request, Response } from 'express';
import cors from 'cors';
import analyticsRouter from './routes/analytics.route';
import usersRouter from './routes/user.route';
import router from './routes/routes';
import connectDB from './config/db';

// Import your Redis/caching service here later

const app = express();

// Global Middleware
app.use(express.json()); // Body parser middleware
connectDB();
app.use(cors({
  origin: 'http://localhost:5173', // Allow your React app
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],        // Allow these methods
  credentials: true   ,
  allowedHeaders: ['Content-Type', 'Authorization'],             // Allow cookies/headers if needed
}));
// Simple Health Check Route
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});
app.use('/api/v1/analytics', analyticsRouter);
app.use('/api/v1/', [usersRouter,router]);

app.use((err: Error, req: Request, res: Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;