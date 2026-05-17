import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
    FaSearch, 
    FaStar, 
    FaFire,
    FaPlay,
    FaArrowRight,
    FaFilm,
    FaTv,
    FaRocket,
    FaGhost,
    FaCrown
} from 'react-icons/fa';
import { 
    MdMovie, 
    MdLiveTv, 
    MdTrendingUp,
    MdAutoAwesome 
} from 'react-icons/md';
import { BsLightningCharge } from 'react-icons/bs';
import { getSuggestions } from '../services/api';
import { MovieSuggestion } from '../types';

interface HeroProps {
    onSearch: (title: string) => void;
}

const QUICK_TAGS = [
    { title: 'Inception', icon: <FaRocket className="w-3 h-3" /> },
    { title: 'Breaking Bad', icon: <MdLiveTv className="w-3 h-3" /> },
    { title: 'Interstellar', icon: <FaStar className="w-3 h-3" /> },
    { title: 'The Matrix', icon: <BsLightningCharge className="w-3 h-3" /> },
    { title: 'Stranger Things', icon: <FaGhost className="w-3 h-3" /> },
    { title: 'The Godfather', icon: <FaCrown className="w-3 h-3" /> },
];

const STATS = [
    { icon: <MdMovie className="w-5 h-5" />, label: 'Movies', value: '100K+' },
    { icon: <MdLiveTv className="w-5 h-5" />, label: 'Series', value: '50K+' },
    { icon: <FaStar className="w-5 h-5" />, label: 'Ratings', value: '1M+' },
];

export const Hero: React.FC<HeroProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<MovieSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            setIsSearching(true);
            onSearch(query.trim());
            setShowSuggestions(false);
            setIsFocused(false);
            setTimeout(() => setIsSearching(false), 500);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        if (value.trim().length < 2) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        debounceRef.current = setTimeout(async () => {
            try {
                const results = await getSuggestions(value.trim());
                setSuggestions(results);
                setShowSuggestions(results.length > 0);
            } catch (error) {
                console.error('Suggestion fetch error:', error);
                setSuggestions([]);
                setShowSuggestions(false);
            }
        }, 300);
    };

    const handleSuggestionClick = (suggestion: MovieSuggestion) => {
        setQuery(suggestion.title);
        setShowSuggestions(false);
        setIsFocused(false);
        onSearch(suggestion.title);
    };

    const handleClickOutside = useCallback((e: MouseEvent) => {
        const target = e.target as Node;
        if (
            suggestionsRef.current &&
            !suggestionsRef.current.contains(target) &&
            inputRef.current &&
            !inputRef.current.contains(target) &&
            formRef.current &&
            !formRef.current.contains(target)
        ) {
            setShowSuggestions(false);
            setIsFocused(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [handleClickOutside]);

    return (
        <section id="hero" className="relative min-h-[100vh] flex items-center justify-center pt-20 pb-16 overflow-hidden">
            
            <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center" style={{ zIndex: 1 }}>
                
                <div className="animate-fade-in-up mb-8 relative" style={{ zIndex: 1 }}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-sm">
                        <MdAutoAwesome className="w-4 h-4 text-accent animate-pulse" />
                        <span className="text-sm font-medium text-accent">
                            Discover Your Next Favorite
                        </span>
                    </div>
                </div>

                <h1 
                    className="relative font-display text-3xl sm:text-6xl md:text-5xl lg:text-5xl font-bold mb-6 animate-fade-in-up leading-tight"
                    style={{ animationDelay: '0.2s', zIndex: 1 }}
                >
                    <span className="text-gray-900 dark:text-white">
                        Explore{' '}
                    </span>
                    <span className="relative inline-block">
                        <span className="relative z-10 bg-gradient-to-r from-accent via-orange-500 to-pink-500 bg-clip-text text-transparent">
                            Movies & TV
                        </span>
                        <div className="absolute -bottom-2 left-0 right-0 h-3 bg-accent/20 rounded-full blur-sm" />
                    </span>
                    <br />
                    <span className="text-gray-900 dark:text-white">
                        Like Never Before
                    </span>
                </h1>

                <p 
                    className="relative text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-4 sm:mb-12 animate-fade-in-up leading-relaxed"
                    style={{ animationDelay: '0.4s', zIndex: 1 }}
                >
                    Search through thousands of movies and TV series. Get detailed information, 
                    ratings, cast, and more. All in one place.
                </p>

                <form 
                    ref={formRef}
                    onSubmit={handleSubmit} 
                    className="relative max-w-xl h-10 mx-auto mb-24 sm:mb-12 animate-fade-in-up"
                    style={{ animationDelay: '0.6s', zIndex: 50 }}
                >
                    <div className={`relative flex flex-col sm:flex-row gap-0 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl transition-all duration-300 ${
                        isFocused 
                            ? 'ring-4 ring-accent/20 shadow-accent/10 scale-[1.02]' 
                            : 'shadow-gray-200/50 dark:shadow-black/50 hover:shadow-xl'
                    }`}>
                        <div className="flex-1 relative">
                            <FaSearch className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                                isFocused ? 'text-accent' : 'text-gray-400 dark:text-gray-500'
                            }`} />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={handleInputChange}
                                onFocus={() => setIsFocused(true)}
                                placeholder="Search for movies or TV series..."
                                className="w-full bg-transparent border-none outline-none pl-14 pr-4 py-4 sm:py-5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-lg"
                            />
                        </div>
                        
                        <div className="sm:w-auto p-2 sm:p-2">
                            <button
                                type="submit"
                                disabled={isSearching}
                                className="w-full sm:w-auto bg-gradient-to-r from-accent to-accent-hover hover:from-accent-hover hover:to-accent text-white px-8 py-3 sm:py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 hover:scale-105 active:scale-95"
                            >
                                {isSearching ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Searching...</span>
                                    </>
                                ) : (
                                    <>
                                        <FaSearch className="w-4 h-4" />
                                        <span>Search</span>
                                        <FaArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {showSuggestions && suggestions.length > 0 && (
                        <div
                            ref={suggestionsRef}
                            className="absolute top-full left-0 right-0 mt-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl max-h-72 overflow-y-auto backdrop-blur-xl"
                            style={{ zIndex: 9999 }}
                        >
                            <div className="p-2">
                                {suggestions.map((suggestion, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 flex items-center justify-between group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                                                <FaPlay className="w-3 h-3 text-accent" />
                                            </div>
                                            <span className="text-gray-900 dark:text-white font-medium group-hover:text-accent transition-colors">
                                                {suggestion.title}
                                            </span>
                                        </div>
                                        <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md group-hover:bg-accent/10 dark:group-hover:bg-accent/10 transition-colors">
                                            {suggestion.year}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </form>

                <div 
                    className="relative flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-12 animate-fade-in-up"
                    style={{ animationDelay: '0.8s', zIndex: 1 }}
                >
                    {STATS.map((stat, index) => (
                        <div 
                            key={index}
                            className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg shadow-gray-200/50 dark:shadow-black/20"
                        >
                            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                                {stat.icon}
                            </div>
                            <div className="text-left">
                                <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div 
                    className="relative flex flex-wrap items-center justify-center gap-2 sm:gap-3 animate-fade-in-up"
                    style={{ animationDelay: '1s', zIndex: 1 }}
                >
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <FaFire className="w-3 h-3 text-accent" />
                        Trending:
                    </span>
                    {QUICK_TAGS.map((tag) => (
                        <button
                            key={tag.title}
                            onClick={() => {
                                setQuery(tag.title);
                                onSearch(tag.title);
                            }}
                            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
                        >
                            <span className="group-hover:scale-110 transition-transform duration-200">
                                {tag.icon}
                            </span>
                            <span>{tag.title}</span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};