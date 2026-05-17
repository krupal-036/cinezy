import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { omdbService } from '../services/omdb.js';
import { AppError, ValidationError } from '../utils/errors.js';

const router = Router();

// Validation schemas
const searchSchema = z.object({
    title: z.string().min(1, 'Please enter a movie or series title.').trim()
});

const movieDetailsSchema = z.object({
    imdbId: z.string().min(1, 'IMDb ID is required.')
});

const suggestSchema = z.object({
    query: z.string().min(2, 'Query must be at least 2 characters.').trim()
});

// Error handler middleware
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

// Search by title
router.post('/search', asyncHandler(async (req: Request, res: Response) => {
    const validation = searchSchema.safeParse(req.body);

    if (!validation.success) {
        throw new ValidationError(validation.error.errors[0].message);
    }

    const data = await omdbService.searchByTitle(validation.data.title);
    res.json(data);
}));

// Get movie details by IMDb ID
router.get('/movie/:imdbId', asyncHandler(async (req: Request, res: Response) => {
    const validation = movieDetailsSchema.safeParse({ imdbId: req.params.imdbId });

    if (!validation.success) {
        throw new ValidationError(validation.error.errors[0].message);
    }

    const data = await omdbService.getMovieDetails(validation.data.imdbId);
    res.json(data);
}));

// Get trending movies
router.get('/trending', asyncHandler(async (req: Request, res: Response) => {
    const data = await omdbService.getTrending();
    res.json(data);
}));

// Get suggestions
router.get('/suggest', asyncHandler(async (req: Request, res: Response) => {
    const query = req.query.query as string || '';

    if (!query || query.length < 2) {
        return res.json({ suggestions: [] });
    }

    const suggestions = await omdbService.getSuggestions(query);
    res.json({ suggestions });
}));

export default router;