import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';
import { AppError } from './utils/errors.js';
import { serveFrontend } from "./middleware/serveFrontend.js";
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
app.set("trust proxy", 1);

const DIST_PATH = path.join(process.cwd(), "public");
const serveApp = serveFrontend(DIST_PATH);

app.use(express.json());
app.use(express.static(DIST_PATH));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { Response: 'False', Error: 'Too many requests, please try again later.' }
});

app.use('/api/', limiter);

app.use('/api', apiRoutes);

app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.use((req: Request, res: Response) => {
    res.status(404).json({
        Response: 'False',
        Error: 'Route not found'
    });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err);

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            Response: 'False',
            Error: err.message
        });
    }

    res.status(500).json({
        Response: 'False',
        Error: 'Internal server error'
    });
});

if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
}

app.get("/", serveApp);
app.get("/api/*splat", serveApp);
app.get("*splat", serveApp);

export default app;