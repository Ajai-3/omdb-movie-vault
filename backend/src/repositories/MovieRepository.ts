import axios from 'axios';
import { injectable } from 'inversify';
import { AppError } from '../middleware/errorHandler';
import { ERROR_MESSAGES } from '../constants/messages';
import { IMovieRepository } from '../interfaces/repositories/IMovieRepository';

@injectable()
export class MovieRepository implements IMovieRepository {
  private readonly _apiKey = process.env.OMDB_API_KEY;
  private readonly _baseUrl = process.env.OMDB_BASE_URL;

  async searchMovies(query: string, page: number = 1) {
    try {
      const response = await axios.get(`${this._baseUrl}/`, {
        params: {
          apikey: this._apiKey,
          s: query.trim(),
          page: page,
        },
      });

      return response.data;
    } catch (error) {
      throw new AppError(ERROR_MESSAGES.FAILED_TO_FETCH_MOVIES, 502);
    }
  }

  async getMovieDetails(imdbId: string) {
    try {
      const response = await axios.get(`${this._baseUrl}/`, {
        params: {
          apikey: this._apiKey,
          i: imdbId,
        },
      });
      return response.data;
    } catch (error) {
      return { imdbRating: 'N/A' };
    }
  }
}
