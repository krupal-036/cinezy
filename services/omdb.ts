import axios from 'axios';
import dotenv from 'dotenv';
import { OMDBMovieDetail, OMDBSearchResponse } from '../types';
import { AppError, APIKeyError } from '../utils/errors';

dotenv.config();

const OMDB_API_URL = 'http://www.omdbapi.com/';
const REQUEST_TIMEOUT = 10000;
const SUGGESTION_TIMEOUT = 5000;

const TRENDING_IMDB_IDS = [
  "tt0111161", "tt0068646", "tt0468569", "tt0071562", "tt0050083",
  "tt0108052", "tt0167260", "tt0060196", "tt0120737", "tt0109830",
  "tt1375666", "tt0167261", "tt0080684", "tt0133093", "tt0099685",
  "tt0073486", "tt0047478", "tt0038650", "tt0102926", "tt0076759",
  "tt0118799", "tt0120815", "tt0816692", "tt0245429", "tt0120689",
  "tt6751668", "tt0103064", "tt0253474", "tt0110413", "tt0110357",
  "tt0172495", "tt0407887", "tt0482571", "tt2582802", "tt0034583",
  "tt1675434", "tt0095765", "tt0910970", "tt0088763", "tt0209144",
  "tt0032553", "tt0405094", "tt4154756", "tt7286456", "tt4633694",
  "tt0114709", "tt4154796", "tt1345836", "tt0082971", "tt0081505",
  "tt0892769", "tt8267604", "tt0903747", "tt1475582", "tt0386676",
  "tt0417299", "tt2861424", "tt0086190", "tt2380307", "tt5311514",
  "tt10872600", "tt15398776", "tt1517268", "tt10648342", "tt0107290",
  "tt0266543", "tt0145487", "tt2096673", "tt2278388", "tt0372784",
  "tt0054215", "tt0053125", "tt0208092", "tt0120735", "tt0112573",
  "tt0090605", "tt0162222", "tt0093058", "tt1877830", "tt0119488",
  "tt1954470", "tt0043014", "tt0363163", "tt1049413"
];

class OMDbService {
  private apiKeys: string[];

  constructor() {
    this.apiKeys = this.loadApiKeys();
    if (this.apiKeys.length === 0) {
      console.error('CRITICAL: No OMDB API keys (OMDB_API_KEY_n) found in environment variables.');
    }
  }

  private loadApiKeys(): string[] {
    const keys: string[] = [];
    let i = 1;
    while (true) {
      const key = process.env[`OMDB_API_KEY_${i}`];
      if (key) {
        keys.push(key);
        i++;
      } else {
        break;
      }
    }
    return keys;
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  private async fetchFromOMDb<T>(
    params: Record<string, string>,
    timeout: number
  ): Promise<T> {
    if (this.apiKeys.length === 0) {
      throw new APIKeyError('No OMDB API keys are configured in the application.');
    }

    let lastOperationalError = 'All API key attempts failed or keys reached their limit/were invalid.';
    const shuffledKeys = this.shuffleArray(this.apiKeys);

    for (const apiKey of shuffledKeys) {
      try {
        const response = await axios.get(OMDB_API_URL, {
          params: { ...params, apikey: apiKey },
          timeout
        });

        const data = response.data;

        if (data.Response === 'True') {
          return data as T;
        }

        const omdbErrorMsg = data.Error || 'Unknown error from OMDB API.';
        if (
          omdbErrorMsg.toLowerCase().includes('request limit reached') ||
          omdbErrorMsg.toLowerCase().includes('invalid api key')
        ) {
          console.warn(`API key failed: ${omdbErrorMsg}. Trying next key.`);
          lastOperationalError = omdbErrorMsg;
          continue;
        } else {
          throw new AppError(500, omdbErrorMsg);
        }
      } catch (error) {
        if (error instanceof AppError) throw error;
        if (axios.isAxiosError(error)) {
          console.warn(`Request failed: ${error.message}. Trying next key.`);
          lastOperationalError = `Network request to OMDB API failed: ${error.message}`;
          continue;
        }
        throw error;
      }
    }

    throw new AppError(500, lastOperationalError);
  }

  async searchByTitle(title: string): Promise<OMDBMovieDetail> {
    return this.fetchFromOMDb<OMDBMovieDetail>(
      { t: title, plot: 'full' },
      REQUEST_TIMEOUT
    );
  }

  async getMovieDetails(imdbId: string): Promise<OMDBMovieDetail> {
    return this.fetchFromOMDb<OMDBMovieDetail>(
      { i: imdbId, plot: 'full' },
      REQUEST_TIMEOUT
    );
  }

  async getTrending(): Promise<OMDBMovieDetail[]> {
    const selectedIds = this.shuffleArray(TRENDING_IMDB_IDS).slice(0, 10);
    const trendingMovies: OMDBMovieDetail[] = [];

    for (const imdbId of selectedIds) {
      try {
        const data = await this.fetchFromOMDb<OMDBMovieDetail>(
          { i: imdbId, plot: 'short' },
          REQUEST_TIMEOUT
        );
        trendingMovies.push(data);
      } catch (error) {
        console.warn(`Could not fetch trending movie ${imdbId}:`, error);
      }
    }

    return trendingMovies;
  }

  async getSuggestions(query: string): Promise<{ title: string; year: string }[]> {
    const data = await this.fetchFromOMDb<OMDBSearchResponse>(
      { s: query },
      SUGGESTION_TIMEOUT
    );

    if (data.Search && data.Search.length > 0) {
      return data.Search.slice(0, 5).map(item => ({
        title: item.Title,
        year: item.Year
      }));
    }

    return [];
  }
}

export const omdbService = new OMDbService();