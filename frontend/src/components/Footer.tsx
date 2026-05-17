import React from 'react';
import { 
    FaFilm, 
    FaGithub, 
    FaHeart,
    FaArrowUp,
    FaStar,
    FaCode,
    FaExternalLinkAlt,
    FaGlobe,
    FaEnvelope
} from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { 
    HiTrendingUp, 
    HiHome, 
    HiLightBulb, 
    HiShieldCheck,
    HiSparkles 
} from 'react-icons/hi';

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const quickLinks = [
        { href: '#hero', label: 'Home', icon: <HiHome className="w-4 h-4" /> },
        { href: '#trending', label: 'Trending', icon: <HiTrendingUp className="w-4 h-4" /> },
        { href: '#how-it-works', label: 'How It Works', icon: <HiLightBulb className="w-4 h-4" /> },
    ];

    const socialLinks = [
        { 
            href: 'https://github.com/krupal-036/cinezy', 
            icon: <FaGithub className="w-5 h-5" />, 
            label: 'GitHub',
            color: 'hover:bg-gray-900 hover:text-white'
        },
        { 
            href: 'https://krupal.vercel.app', 
            icon: <FaGlobe className="w-5 h-5" />, 
            label: 'Portfolio',
            color: 'hover:bg-blue-500 hover:text-white'
        },
        { 
            href: 'mailto:krupalfataniya007@gmail.com', 
            icon: <FaEnvelope className="w-5 h-5" />, 
            label: 'Gmail',
            color: 'hover:bg-indigo-500 hover:text-white'
        },
    ];

    return (
        <footer className="relative bg-gradient-to-b from-transparent via-gray-50/50 to-gray-100/50 dark:from-transparent dark:via-dark-bg/50 dark:to-dark-card/50 border-t border-gray-200 dark:border-gray-800 backdrop-blur-sm z-10">
            
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                
                <div className="flex justify-center mb-12">
                    <button
                        onClick={scrollToTop}
                        className="group flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-lg shadow-gray-200 dark:shadow-black/20 border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:shadow-accent/10 hover:border-accent/30 transition-all duration-300 hover:-translate-y-1"
                    >
                        <FaArrowUp className="w-4 h-4 text-gray-400 group-hover:text-accent transition-colors group-hover:-translate-y-0.5 transition-transform" />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-accent transition-colors">
                            Back to Top
                        </span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-hover rounded-2xl flex items-center justify-center shadow-lg shadow-accent/25">
                                <FaFilm className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="font-display font-bold text-2xl bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent">
                                    Cinezy
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                    <HiSparkles className="w-3 h-3" />
                                    Movie & Series Explorer
                                </p>
                            </div>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md leading-relaxed">
                            Your ultimate destination for discovering movies and TV series. 
                            Get detailed information, ratings, cast details, and more. 
                            Powered by the OMDB API.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                <FaStar className="w-4 h-4 text-yellow-500" />
                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">10K+ Movies</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                <HiShieldCheck className="w-4 h-4 text-green-500" />
                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Free to Use</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-display font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-5 bg-accent rounded-full" />
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="group flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-accent dark:hover:text-accent transition-colors py-1"
                                    >
                                        <span className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-accent/10 group-hover:scale-110 transition-all duration-200">
                                            {link.icon}
                                        </span>
                                        <span className="font-medium">{link.label}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h4 className="font-display font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-5 bg-accent rounded-full" />
                                Connect
                            </h4>
                            <div className="flex flex-wrap gap-3">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`group relative w-12 h-12 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-lg ${social.color}`}
                                        aria-label={social.label}
                                    >
                                        {social.icon}
                                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                            {social.label}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="font-display font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                <span className="w-1.5 h-5 bg-accent rounded-full" />
                                Powered By
                            </h4>
                            <a
                                href="http://www.omdbapi.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-yellow-400/10 to-orange-400/10 border border-yellow-200 dark:border-yellow-900/30 text-gray-700 dark:text-gray-300 hover:border-accent/30 transition-all duration-300 group"
                            >
                                <FaCode className="w-4 h-4 text-accent" />
                                <span className="text-sm font-medium">OMDB API</span>
                                <FaExternalLinkAlt className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t-2 border-gray-200 dark:border-gray-800">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2">
                            © {currentYear} Cinezy. Made with 
                            <FaHeart className="w-4 h-4 text-red-500 animate-pulse" />
                            for movie lovers
                        </p>
                        
                        <div className="flex items-center gap-6">
                            <a href="#" className="text-xs text-gray-500 dark:text-gray-400 hover:text-accent transition-colors">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-xs text-gray-500 dark:text-gray-400 hover:text-accent transition-colors">
                                Terms of Service
                            </a>
                            <a
                                href="https://github.com/krupal-036/cinezy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-accent transition-colors"
                            >
                                <FaGithub className="w-3.5 h-3.5" />
                                Open Source
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};