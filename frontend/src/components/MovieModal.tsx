import React, { useEffect } from 'react';
import { 
    X, Star, Calendar, Clock, Award, Globe, DollarSign, 
    Link as LinkIcon, Tv, Users, PenTool, Camera, Tag, 
    Flag, Languages, BadgeCheck, Film, Sparkles, TrendingUp,
    ChevronRight, ExternalLink, AlertCircle
} from 'lucide-react';
import { OMDBMovieDetail } from '../types';

interface MovieModalProps {
    movie: OMDBMovieDetail | null;
    loading: boolean;
    error: string | null;
    onClose: () => void;
}

const PLACEHOLDER_POSTER = 'https://via.placeholder.com/300x450/0d1117/8b949e.png?text=No+Poster';

const RatingBadge: React.FC<{ source: string; value: string }> = ({ source, value }) => (
    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform duration-200">
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
            <Star className="w-4 h-4 text-accent fill-accent" />
        </div>
        <div className="min-w-0">
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{source}</p>
            <p className="text-sm font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
    </div>
);

const DetailItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    value: string;
    isLink?: boolean;
}> = ({ icon, label, value, isLink }) => {
    if (!value || value === 'N/A') return null;

    return (
        <div className="group flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 border border-gray-200 dark:border-gray-700 hover:border-accent/30 dark:hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 dark:hover:shadow-accent/5 transition-all duration-300 hover:-translate-y-0.5">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <div className="text-accent">
                    {icon}
                </div>
            </div>
            <div className="flex-1 min-w-0">
                <div className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                    {label}
                </div>
                <div className="text-sm text-gray-900 dark:text-white break-words font-medium">
                    {isLink ? (
                        <a
                            href={value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent hover:text-accent-hover inline-flex items-center gap-1 group/link"
                        >
                            <span className="underline-offset-2 group-hover/link:underline">{value}</span>
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                        </a>
                    ) : (
                        value
                    )}
                </div>
            </div>
        </div>
    );
};

const StatCard: React.FC<{
    icon: React.ReactNode;
    label: string;
    value: string;
}> = ({ icon, label, value }) => (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <div className="text-accent">
            {icon}
        </div>
        <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400">{label}</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{value}</p>
        </div>
    </div>
);

export const MovieModal: React.FC<MovieModalProps> = ({ movie, loading, error, onClose }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) onClose();
    };

    const typeConfig = {
        movie: { 
            color: 'from-blue-600 to-indigo-600', 
            bg: 'bg-blue-100 dark:bg-blue-900/30',
            text: 'text-blue-700 dark:text-blue-300',
            icon: <Film className="w-3 h-3" />
        },
        series: { 
            color: 'from-emerald-600 to-green-600', 
            bg: 'bg-emerald-100 dark:bg-emerald-900/30',
            text: 'text-emerald-700 dark:text-emerald-300',
            icon: <Tv className="w-3 h-3" />
        },
        episode: { 
            color: 'from-amber-600 to-orange-600', 
            bg: 'bg-amber-100 dark:bg-amber-900/30',
            text: 'text-amber-700 dark:text-amber-300',
            icon: <PlayIcon className="w-3 h-3" />
        },
    };

    const currentType = movie?.Type && typeConfig[movie.Type] ? typeConfig[movie.Type] : typeConfig.movie;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            onClick={handleOverlayClick}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-black/90 backdrop-blur-md animate-fade-in" />
            
            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,112,67,0.1),transparent_70%)]" />
            </div>

            <div className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border shadow-2xl animate-fade-in-up">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:bg-red-500 hover:border-red-500 hover:text-white transition-all duration-200 text-gray-600 dark:text-gray-400 hover:rotate-90 group"
                    aria-label="Close modal"
                >
                    <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>

                <div className="overflow-y-auto max-h-[90vh] scrollbar-thin">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-32 gap-6">
                            <div className="relative">
                                <div className="w-20 h-20 border-4 border-gray-200 dark:border-gray-800 border-t-accent rounded-full animate-spin" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Film className="w-8 h-8 text-accent animate-pulse" />
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">Loading Details</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Fetching movie information...</p>
                            </div>
                        </div>
                    ) : error || !movie || movie.Response === 'False' ? (
                        <div className="flex flex-col items-center justify-center py-32 px-8">
                            <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-6">
                                <AlertCircle className="w-10 h-10 text-red-500" />
                            </div>
                            <h3 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-2">Oops! Something went wrong</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
                                {error || movie?.Error || 'An error occurred while fetching movie details.'}
                            </p>
                            <button
                                onClick={onClose}
                                className="mt-8 px-6 py-2.5 bg-accent hover:bg-accent-hover text-white rounded-xl font-medium transition-colors"
                            >
                                Go Back
                            </button>
                        </div>
                    ) : (
                        <div className="p-6 sm:p-8 lg:p-10">
                            <div className="flex flex-col lg:flex-row gap-8 mb-8">
                                <div className="flex-shrink-0 mx-auto lg:mx-0">
                                    <div className="relative group/poster">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-accent to-purple-600 rounded-2xl opacity-0 group-hover/poster:opacity-100 blur transition duration-500" />
                                        <div className="relative w-56 sm:w-64 rounded-2xl overflow-hidden shadow-2xl">
                                            <img
                                                src={movie.Poster !== 'N/A' ? movie.Poster : PLACEHOLDER_POSTER}
                                                alt={`${movie.Title} Poster`}
                                                className="w-full aspect-[2/3] object-cover"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = PLACEHOLDER_POSTER;
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/poster:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                                <p className="text-white text-sm font-medium">View Details</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                        <div className="min-w-0">
                                            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                                                {movie.Title}
                                            </h2>
                                            {movie.Year !== 'N/A' && (
                                                <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
                                                    {movie.Year}
                                                </p>
                                            )}
                                        </div>
                                        {movie.imdbRating !== 'N/A' && (
                                            <div className="flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-br from-yellow-400/10 to-amber-500/10 border border-yellow-200 dark:border-yellow-900/30">
                                                <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                                                <div>
                                                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{movie.imdbRating}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">/10 IMDb</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {movie.Type && (
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r ${currentType.color} text-white shadow-lg`}>
                                                {currentType.icon}
                                                {movie.Type.toUpperCase()}
                                            </span>
                                        )}
                                        {movie.Rated !== 'N/A' && (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                                                <BadgeCheck className="w-3 h-3" />
                                                {movie.Rated}
                                            </span>
                                        )}
                                        {movie.Runtime !== 'N/A' && (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                                                <Clock className="w-3 h-3" />
                                                {movie.Runtime}
                                            </span>
                                        )}
                                        {movie.Genre !== 'N/A' && (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                                                <Tag className="w-3 h-3" />
                                                {movie.Genre.split(',')[0]}
                                            </span>
                                        )}
                                    </div>

                                    {movie.Plot !== 'N/A' && (
                                        <div className="relative p-5 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 border border-gray-200 dark:border-gray-700 mb-6">
                                            <div className="absolute top-0 left-4 -translate-y-1/2 px-3 py-1 rounded-full bg-accent text-white text-xs font-semibold flex items-center gap-1">
                                                <Sparkles className="w-3 h-3" />
                                                Synopsis
                                            </div>
                                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-2">
                                                {movie.Plot}
                                            </p>
                                        </div>
                                    )}

                                    {movie.Ratings && movie.Ratings.length > 0 && (
                                        <div className="mb-6">
                                            <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                                                <TrendingUp className="w-4 h-4" />
                                                Ratings & Reviews
                                            </h3>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                {movie.Ratings.map((rating, index) => (
                                                    <RatingBadge key={index} source={rating.Source} value={rating.Value} />
                                                ))}
                                                {movie.imdbVotes !== 'N/A' && (
                                                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
                                                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                                                            <Users className="w-4 h-4 text-accent" />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">Votes</p>
                                                            <p className="text-sm font-bold text-gray-900 dark:text-white">{movie.imdbVotes}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="border-t-2 border-gray-100 dark:border-gray-800 pt-8">
                                <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-6">
                                    <Award className="w-4 h-4" />
                                    Detailed Information
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    <DetailItem icon={<Calendar className="w-4 h-4" />} label="Release Date" value={movie.Released} />
                                    <DetailItem icon={<Camera className="w-4 h-4" />} label="Director" value={movie.Director} />
                                    <DetailItem icon={<PenTool className="w-4 h-4" />} label="Writer" value={movie.Writer} />
                                    <DetailItem icon={<Users className="w-4 h-4" />} label="Cast" value={movie.Actors} />
                                    <DetailItem icon={<Languages className="w-4 h-4" />} label="Language" value={movie.Language} />
                                    <DetailItem icon={<Flag className="w-4 h-4" />} label="Country" value={movie.Country} />
                                    <DetailItem icon={<Award className="w-4 h-4" />} label="Awards" value={movie.Awards} />
                                    {movie.Metascore !== 'N/A' && (
                                        <DetailItem 
                                            icon={<Star className="w-4 h-4" />} 
                                            label="Metascore" 
                                            value={`${movie.Metascore} / 100`} 
                                        />
                                    )}
                                    <DetailItem icon={<DollarSign className="w-4 h-4" />} label="Box Office" value={movie.BoxOffice} />
                                    <DetailItem icon={<Globe className="w-4 h-4" />} label="Production" value={movie.Production} />
                                    <DetailItem icon={<LinkIcon className="w-4 h-4" />} label="Website" value={movie.Website} isLink />
                                    {movie.Type === 'series' && movie.totalSeasons && (
                                        <DetailItem icon={<Tv className="w-4 h-4" />} label="Total Seasons" value={movie.totalSeasons} />
                                    )}
                                    {movie.DVD !== 'N/A' && (
                                        <DetailItem icon={<ChevronRight className="w-4 h-4" />} label="DVD Release" value={movie.DVD} />
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
    </svg>
);