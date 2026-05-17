import React from 'react';
import { Star, Film, Tv, PlaySquare } from 'lucide-react';
import { TrendingMovie } from '../types';

interface MovieCardProps {
    movie: TrendingMovie;
    onClick: (imdbId: string) => void;
    index: number;
}

const PLACEHOLDER_POSTER = 'https://bing.com/th/id/BCO.8b06be0d-fa13-49d4-bfa6-77ed1e81543f.png';

const getTypeIcon = (type: string) => {
    switch (type) {
        case 'series':
            return <Tv className="w-3 h-3" />;
        case 'episode':
            return <PlaySquare className="w-3 h-3" />;
        default:
            return <Film className="w-3 h-3" />;
    }
};

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick, index }) => {
    const posterUrl = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : PLACEHOLDER_POSTER;

    return (
        <div
            onClick={() => onClick(movie.imdbID)}
            className="group cursor-pointer bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl overflow-hidden hover:shadow-2xl dark:hover:shadow-black/50 hover:shadow-black/10 transition-all duration-300 hover:-translate-y-2 animate-fade-in-up opacity-0 transform translate-y-5"
            style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'forwards'
            }}
        >
            <div className="relative aspect-[2/3] overflow-hidden">
                <img
                    src={posterUrl}
                    alt={`${movie.Title} Poster`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = PLACEHOLDER_POSTER;
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-white font-semibold">{movie.imdbRating}</span>
                    </div>
                )}
            </div>

            <div className="p-4">
                <h3 className="font-display font-semibold text-light-text dark:text-dark-text mb-2 truncate">
                    {movie.Title}
                </h3>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-light-text-secondary dark:text-dark-text-secondary">{movie.Year}</span>
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-accent/10 text-accent rounded text-xs capitalize">
                        {getTypeIcon(movie.Type)}
                        {movie.Type}
                    </span>
                </div>
            </div>
        </div>
    );
};