export interface OMDBRating {
    Source: string;
    Value: string;
}

export interface OMDBSearchResult {
    Title: string;
    Year: string;
    imdbID: string;
    Type: 'movie' | 'series' | 'episode';
    Poster: string;
}

export interface OMDBMovieDetail {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: OMDBRating[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: 'movie' | 'series' | 'episode';
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    totalSeasons?: string;
    Response: 'True' | 'False';
    Error?: string;
}

export interface OMDBSearchResponse {
    Search?: OMDBSearchResult[];
    totalResults?: string;
    Response: 'True' | 'False';
    Error?: string;
}

export interface APIResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

export interface TrendingMovie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
    Genre?: string;
    imdbRating?: string;
}

export interface MovieSuggestion {
    title: string;
    year: string;
}

export interface SuggestionsResponse {
    suggestions: MovieSuggestion[];
}