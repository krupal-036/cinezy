import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, TrendingUp } from 'lucide-react';
import { getTrending } from '../services/api';
import { TrendingMovie } from '../types';
import { MovieCard } from './MovieCard';

interface TrendingSectionProps {
    onMovieClick: (imdbId: string) => void;
}

export const TrendingSection: React.FC<TrendingSectionProps> = ({ onMovieClick }) => {
    const [movies, setMovies] = useState<TrendingMovie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetchTrending = useCallback(async () => {
        try {
            setError(null);
            setLoading(true);
            const data = await getTrending();
            setMovies(data);
        } catch (err) {
            setError('Failed to fetch trending movies. Please try again.');
            console.error('Error fetching trending:', err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        fetchTrending();
    }, [fetchTrending]);

    const handleRefresh = () => {
        setRefreshing(true);
        fetchTrending();
    };

    return (
        <section id="trending" className="py-16 sm:py-24 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
                    <div>
                        <h2 className="font-display text-3xl sm:text-4xl font-bold text-light-text dark:text-dark-text mb-2">
                            Trending Now
                        </h2>
                        <p className="text-light-text-secondary dark:text-dark-text-secondary">
                            Discover what's popular right now
                        </p>
                    </div>
                    <button
                        onClick={handleRefresh}
                        disabled={refreshing || loading}
                        className="flex items-center gap-2 px-4 py-2 bg-transparent border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text hover:bg-accent hover:text-white hover:border-accent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                        {refreshing ? 'Loading...' : 'Refresh'}
                    </button>
                </div>

                {loading && !refreshing ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-light-border dark:border-dark-border border-t-accent rounded-full animate-spin"></div>
                            <p className="text-light-text-secondary dark:text-dark-text-secondary animate-pulse">Loading trending movies...</p>
                        </div>
                    </div>
                ) : error ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="text-center">
                            <div className="text-red-500 text-5xl mb-4">⚠️</div>
                            <p className="text-light-text dark:text-dark-text text-lg mb-4">{error}</p>
                            <button
                                onClick={fetchTrending}
                                className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                        {movies.map((movie, index) => (
                            <MovieCard
                                key={movie.imdbID}
                                movie={movie}
                                onClick={onMovieClick}
                                index={index}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};