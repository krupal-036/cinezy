import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Film, Star, TrendingUp, Compass, ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useTheme } from '../hooks/useTheme';

export const Header: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Track scroll position for header styling
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        document.body.classList.toggle('overflow-hidden');
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        document.body.classList.remove('overflow-hidden');
    };

    const navLinks = [
        { href: '#hero', label: 'Home', icon: <Film className="w-4 h-4" /> },
        { href: '#trending', label: 'Trending', icon: <TrendingUp className="w-4 h-4" /> },
        { href: '#how-it-works', label: 'How It Works', icon: <Compass className="w-4 h-4" /> },
    ];

    return (
        <>
            <header 
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled 
                        ? 'bg-white/90 dark:bg-dark-bg/90 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20' 
                        : 'bg-transparent'
                }`}
            >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent via-purple-500 to-pink-500 transform origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100" />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 sm:h-20">
                        {/* Logo */}
                        <a 
                            href="/" 
                            className="group flex items-center gap-3 text-accent font-display font-bold text-xl sm:text-2xl hover:scale-105 transition-transform duration-200"
                        >
                            <div className="relative">
                                <div className="absolute -inset-1 bg-accent/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative w-10 h-10 bg-gradient-to-br from-accent to-accent-hover rounded-xl flex items-center justify-center shadow-lg shadow-accent/25">
                                    <Film className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            <span className="bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent">
                                Cinezy
                            </span>
                        </a>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-1">
                            {navLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    className="group relative px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-accent dark:hover:text-accent transition-colors duration-200 rounded-lg hover:bg-accent/5"
                                >
                                    <span className="flex items-center gap-2">
                                        {link.icon}
                                        {link.label}
                                    </span>
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent group-hover:w-3/4 transition-all duration-300 rounded-full" />
                                </a>
                            ))}
                            
                            {/* GitHub Link */}
                            <a
                                href="https://github.com/krupal-036/cinezy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative ml-2 px-4 py-2 text-sm font-medium flex items-center gap-2 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-700 dark:to-gray-600 text-white rounded-xl hover:shadow-lg hover:shadow-gray-500/25 transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <FaGithub className="w-4 h-4" />
                                <span className="hidden sm:inline">GitHub</span>
                                <Star className="w-3 h-3 text-yellow-400 group-hover:rotate-12 transition-transform" />
                            </a>
                        </nav>

                        {/* Right Section */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="relative group w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                            >
                                <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-xl transition-colors duration-300" />
                                <div className="relative z-10 transition-transform duration-500 rotate-0 group-hover:rotate-180">
                                    {theme === 'dark' ? (
                                        <Sun className="w-5 h-5 text-yellow-500" />
                                    ) : (
                                        <Moon className="w-5 h-5 text-gray-600" />
                                    )}
                                </div>
                            </button>

                            {/* Mobile GitHub Link */}
                            <a
                                href="https://github.com/krupal-036/cinezy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-accent transition-colors duration-200"
                                aria-label="GitHub Repository"
                            >
                                <FaGithub className="w-5 h-5" />
                            </a>

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={toggleMobileMenu}
                                className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-accent transition-all duration-200"
                                aria-label="Toggle menu"
                            >
                                {isMobileMenuOpen ? (
                                    <X className="w-5 h-5" />
                                ) : (
                                    <Menu className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden animate-fade-in"
                    onClick={closeMobileMenu}
                />
            )}

            {/* Mobile Menu Panel */}
            <div
                className={`fixed top-0 right-0 z-50 h-full w-80 sm:w-96 bg-white dark:bg-dark-bg shadow-2xl transform transition-transform duration-300 ease-out md:hidden ${
                    isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent-hover rounded-xl flex items-center justify-center shadow-lg shadow-accent/25">
                            <Film className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="font-display font-bold text-lg text-gray-900 dark:text-white">Cinezy</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Movie Explorer</p>
                        </div>
                    </div>
                    <button
                        onClick={closeMobileMenu}
                        className="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-all duration-200"
                        aria-label="Close menu"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="p-6 space-y-2">
                    {navLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            onClick={closeMobileMenu}
                            className="group flex items-center gap-4 px-4 py-4 rounded-2xl text-gray-700 dark:text-gray-300 hover:bg-accent/5 hover:text-accent dark:hover:text-accent transition-all duration-200"
                        >
                            <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-accent/10 group-hover:scale-110 transition-all duration-200">
                                <span className="text-gray-500 dark:text-gray-400 group-hover:text-accent transition-colors">
                                    {link.icon}
                                </span>
                            </div>
                            <span className="text-lg font-semibold flex-1">{link.label}</span>
                            <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                        </a>
                    ))}
                </nav>

                {/* Mobile Menu Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 dark:border-gray-800">
                    <a
                        href="https://github.com/krupal-036/cinezy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-700 dark:to-gray-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:shadow-gray-500/25 transition-all duration-300 hover:-translate-y-0.5"
                        onClick={closeMobileMenu}
                    >
                        <FaGithub className="w-5 h-5" />
                        <span>View on GitHub</span>
                        <Star className="w-4 h-4 text-yellow-400" />
                    </a>
                    
                    <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">
                        Made with ❤️ for movie lovers
                    </p>
                </div>
            </div>
        </>
    );
};