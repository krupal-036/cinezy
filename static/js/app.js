document.addEventListener('DOMContentLoaded', () => {

    const API_ENDPOINTS = {
        search: '/', trending: '/trending', suggest: '/suggest', movieDetails: '/movie/'
    };


    const body = document.body;
    const themeToggleBtn = document.getElementById('theme-toggle');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavCloseBtn = document.getElementById('mobile-nav-close-btn');
    const trendingGrid = document.getElementById('trending-grid');
    const trendingLoader = document.getElementById('trending-loader');
    const refreshTrendingBtn = document.getElementById('refresh-trending');
    const genreFilter = document.getElementById('genre-filter');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-title');
    const suggestionsBox = document.getElementById('suggestions-box');
    const modal = document.getElementById('result-modal');
    const modalBody = document.getElementById('modal-body');
    const modalLoader = document.getElementById('modal-loader');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const backToTopBtn = document.getElementById('back-to-top-btn');


    const applyTheme = (theme) => {
        body.className = theme;
        localStorage.setItem('theme', theme);
        document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    };
    themeToggleBtn.addEventListener('click', () => applyTheme(body.classList.contains('light-mode') ? 'dark-mode' : 'light-mode'));
    applyTheme(localStorage.getItem('theme') || 'dark-mode');


    const toggleMobileNav = () => mobileNav.classList.toggle('open');
    mobileMenuBtn.addEventListener('click', toggleMobileNav);
    mobileNavCloseBtn.addEventListener('click', toggleMobileNav);
    mobileNav.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', toggleMobileNav);
    });


    const fetchAndDisplayTrending = async () => {
        trendingGrid.innerHTML = '';
        trendingLoader.style.display = 'flex';
        try {
            const response = await fetch(API_ENDPOINTS.trending);
            if (!response.ok) throw new Error('Failed to fetch trending movies');
            const movies = await response.json();
            trendingGrid.innerHTML = movies.map(createMovieCardHTML).join('');
        } catch (error) {
            trendingGrid.innerHTML = `<p class="modal-error">${error.message}</p>`;
        } finally {
            trendingLoader.style.display = 'none';
        }
    };

    const showResultInModal = async (imdbId, title) => {
        modal.classList.add('visible');
        modalBody.style.display = 'none';
        modalLoader.style.display = 'flex';
        try {
            let response;
            if (imdbId) {
                response = await fetch(`${API_ENDPOINTS.movieDetails}${imdbId}`);
            } else if (title) {
                response = await fetch(API_ENDPOINTS.search, {
                    method: 'POST', body: new URLSearchParams({ title })
                });
            } else {
                throw new Error("No search query provided.");
            }
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            modalBody.innerHTML = createResultHTML(data);
        } catch (error) {
            modalBody.innerHTML = createErrorHTML(error.message);
        } finally {
            modalLoader.style.display = 'none';
            modalBody.style.display = 'block';
        }
    };


    refreshTrendingBtn.addEventListener('click', fetchAndDisplayTrending);
    // genreFilter.addEventListener('change', () => {
    //     const selectedGenre = genreFilter.value.toLowerCase();
    //     document.querySelectorAll('.movie-card').forEach(card => {
    //         const genres = (card.dataset.genre || '').toLowerCase();
    //         card.style.display = (selectedGenre === 'all' || genres.includes(selectedGenre)) ? 'block' : 'none';
    //     });
    // });

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = searchInput.value.trim();
        if (title) {
            showResultInModal(null, title);
            suggestionsBox.style.display = 'none';
        }
    });

    trendingGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.movie-card');
        if (card?.dataset.imdbId) showResultInModal(card.dataset.imdbId, null);
    });

    modalCloseBtn.addEventListener('click', () => modal.classList.remove('visible'));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('visible'); });


    let debounceTimeout;
    searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimeout);
        const query = searchInput.value.trim();
        if (query.length < 2) {
            suggestionsBox.style.display = 'none';
            return;
        }
        debounceTimeout = setTimeout(async () => {
            try {
                const response = await fetch(`${API_ENDPOINTS.suggest}?query=${encodeURIComponent(query)}`);
                const { suggestions } = await response.json();
                if (suggestions?.length > 0) {
                    suggestionsBox.innerHTML = suggestions.map(s => `<div class="suggestion-item" data-title="${s.title}">${s.title} <span class="suggestion-year">(${s.year})</span></div>`).join('');
                    suggestionsBox.style.display = 'block';
                } else {
                    suggestionsBox.style.display = 'none';
                }
            } catch (error) { console.error("Suggestion fetch error:", error); }
        }, 300);
    });
    suggestionsBox.addEventListener('click', (e) => {
        const item = e.target.closest('.suggestion-item');
        if (item) {
            searchInput.value = item.dataset.title;
            suggestionsBox.style.display = 'none';
            searchForm.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
    });
    document.addEventListener('click', (e) => {
        if (!searchForm.contains(e.target)) suggestionsBox.style.display = 'none';
    });

    const handleScroll = () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    document.addEventListener('scroll', handleScroll);
    backToTopBtn.addEventListener('click', scrollToTop);


    const createMovieCardHTML = (movie) => `
        <div class="movie-card" data-imdb-id="${movie.imdbID}" data-genre="${movie.Genre || ''}">
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://bing.com/th/id/BCO.8b06be0d-fa13-49d4-bfa6-77ed1e81543f.png'}" alt="${movie.Title} Poster" class="movie-card-poster" loading="lazy">
            <div class="movie-card-info">
                <h3 class="movie-card-title">${movie.Title}</h3>
                <div class="movie-card-meta">
                    <span>${movie.Year}</span>
                    <span class="movie-card-rating"><i class="fas fa-star"></i>${movie.imdbRating !== 'N/A' ? movie.imdbRating : '-'}</span>
                </div>
            </div>
        </div>`;

    const createErrorHTML = (message) => `<div class="modal-error"><i class="fas fa-exclamation-triangle"></i> ${message}</div>`;

    const createResultHTML = (data) => {
        if (data.Response === 'False') return createErrorHTML(data.Error);

        const detailsConfig = [
            { label: 'Genre', key: 'Genre', icon: 'fas fa-tags' },
            { label: 'Released', key: 'Released', icon: 'fas fa-calendar-check' },
            { label: 'Director(s)', key: 'Director', icon: 'fas fa-clapperboard' },
            { label: 'Writer(s)', key: 'Writer', icon: 'fas fa-pen-nib' },
            { label: 'Cast', key: 'Actors', icon: 'fas fa-users' },
            { label: 'Language(s)', key: 'Language', icon: 'fas fa-language' },
            { label: 'Country', key: 'Country', icon: 'fas fa-flag' },
            { label: 'Awards', key: 'Awards', icon: 'fas fa-trophy' },
            { label: 'Metascore', key: 'Metascore', icon: 'fas fa-star-half-alt', value: `${data.Metascore} / 100` },
            { label: 'IMDb Rating', key: 'imdbRating', icon: 'fab fa-imdb', value: `<strong>${data.imdbRating}</strong>/10 from ${data.imdbVotes} votes` },
            { label: 'Box Office', key: 'BoxOffice', icon: 'fas fa-dollar-sign' },
            { label: 'Production', key: 'Production', icon: 'fas fa-industry' },
            { label: 'DVD Release', key: 'DVD', icon: 'fas fa-compact-disc' },
            { label: 'Website', key: 'Website', icon: 'fas fa-link', isLink: true },
            { label: 'Total Seasons', key: 'totalSeasons', icon: 'fas fa-tv', condition: data.Type === 'series' }
        ];


        const detailsHTML = detailsConfig.map(item => {
            if (item.condition === false) return '';
            const value = data[item.key];
            if (!value || value === 'N/A') return '';

            const iconHTML = `<i class="${item.icon}" style="margin-right: 10px; opacity: 0.7; width: 20px; text-align: center;"></i>`;
            const displayValue = item.value || (item.isLink ? `<a href="${value}" target="_blank" rel="noopener noreferrer">${value}</a>` : value);

            return `<div class="detail-item">
                        <span class="detail-label">${item.label}</span>
                        <div style="display: flex; align-items: flex-start;">
                            ${iconHTML}
                            <div style="flex: 1;">${displayValue}</div>
                        </div>
                    </div>`;
        }).join('');

        return `
            <div class="modal-body-grid">
                <div class="modal-poster">
                    <img src="${data.Poster !== 'N/A' ? data.Poster : 'https://via.placeholder.com/300x450/0d1117/8b949e.png?text=No+Poster'}" alt="${data.Title} Poster">
                    ${data.Ratings?.length > 0 ? `
                        <div style="margin-top: 1rem;">
                            <strong class="detail-label" style="text-align: left; margin-bottom: .5rem">Source Ratings</strong>
                            <ul class="ratings-list">${data.Ratings.map(r => `<li><strong>${r.Source}:</strong> ${r.Value}</li>`).join('')}</ul>
                        </div>` : ''}
                </div>
                <div class="modal-details">
                    <h2>${data.Title}</h2>
                    <div class="tagline">
                        ${data.Year !== 'N/A' ? `<span><i class="fas fa-calendar-alt"></i> ${data.Year}</span>` : ''}
                        ${data.Runtime !== 'N/A' ? `<span><i class="fas fa-clock"></i> ${data.Runtime}</span>` : ''}
                        ${data.Rated !== 'N/A' ? `<span><i class="fas fa-certificate"></i> ${data.Rated}</span>` : ''}
                        ${data.Type !== 'N/A' ? `<span style="text-transform: capitalize;"><i class="fas fa-film"></i> ${data.Type}</span>` : ''}
                    </div>
                    <p class="plot">${data.Plot !== 'N/A' ? data.Plot : 'No plot available.'}</p>
                    <div class="details-grid">${detailsHTML}</div>
                </div>
            </div>`;
    };

    fetchAndDisplayTrending();

});