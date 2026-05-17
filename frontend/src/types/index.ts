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

export interface APIError {
  Response: string;
  Error: string;
}

export type Theme = 'dark' | 'light';

export interface SearchFormData {
  title: string;
}

export interface DetailItem {
  label: string;
  key: string;
  icon: React.ReactNode;
  value?: string;
  isLink?: boolean;
  condition?: boolean;
}

export interface Star {
  x: number;
  y: number;
  z: number;
  pz: number;
}