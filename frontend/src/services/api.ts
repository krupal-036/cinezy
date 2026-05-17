import axios from 'axios';
import { OMDBMovieDetail, TrendingMovie, MovieSuggestion } from '../types';

const api = axios.create({
    baseURL: '/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const searchByTitle = async (title: string): Promise<OMDBMovieDetail> => {
    const response = await api.post('/search', { title });
    return response.data;
};

export const getMovieDetails = async (imdbId: string): Promise<OMDBMovieDetail> => {
    const response = await api.get(`/movie/${imdbId}`);
    return response.data;
};

export const getTrending = async (): Promise<TrendingMovie[]> => {
    const response = await api.get('/trending');
    return response.data;
};

export const getSuggestions = async (query: string): Promise<MovieSuggestion[]> => {
    const response = await api.get('/suggest', {
        params: { query }
    });
    return response.data.suggestions || [];
};