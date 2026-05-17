import React, { useState, useCallback } from 'react';
import { StarField } from './components/StarField';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrendingSection } from './components/TrendingSection';
import { HowItWorks } from './components/HowItWorks';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { MovieModal } from './components/MovieModal';
import { searchByTitle, getMovieDetails } from './services/api';
import { OMDBMovieDetail } from './types';

const App: React.FC = () => {
    const [modalMovie, setModalMovie] = useState<OMDBMovieDetail | null>(null);
    const [modalLoading, setModalLoading] = useState(false);
    const [modalError, setModalError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = useCallback(() => {
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        setModalMovie(null);
        setModalError(null);
        document.body.style.overflow = '';
    }, []);

    const handleSearch = useCallback(async (title: string) => {
        setModalLoading(true);
        setModalError(null);
        openModal();

        try {
            const data = await searchByTitle(title);
            if (data.Response === 'False') {
                setModalError(data.Error || 'Movie not found');
                setModalMovie(null);
            } else {
                setModalMovie(data);
            }
        } catch (err: any) {
            setModalError(err?.response?.data?.Error || err.message || 'Failed to fetch movie details');
            setModalMovie(null);
        } finally {
            setModalLoading(false);
        }
    }, [openModal]);

    const handleMovieClick = useCallback(async (imdbId: string) => {
        setModalLoading(true);
        setModalError(null);
        openModal();

        try {
            const data = await getMovieDetails(imdbId);
            if (data.Response === 'False') {
                setModalError(data.Error || 'Movie not found');
                setModalMovie(null);
            } else {
                setModalMovie(data);
            }
        } catch (err: any) {
            setModalError(err?.response?.data?.Error || err.message || 'Failed to fetch movie details');
            setModalMovie(null);
        } finally {
            setModalLoading(false);
        }
    }, [openModal]);

    return (
        <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-300">
            <StarField />
            <Header />

            <main className="relative">
                <Hero onSearch={handleSearch} />
                <TrendingSection onMovieClick={handleMovieClick} />
                <HowItWorks />
            </main>

            <Footer />
            <BackToTop />

            {isModalOpen && (
                <MovieModal
                    movie={modalMovie}
                    loading={modalLoading}
                    error={modalError}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default App;