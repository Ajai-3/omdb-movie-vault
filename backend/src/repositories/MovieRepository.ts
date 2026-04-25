import axios from 'axios';
import { env } from '../config/env';
import { injectable } from 'inversify';
import { Movie } from '@/entities/Movie';
import { MovieMapper } from '@/mappers/MovieMapper';
import { OmdbMovieDetails, OmdbSearchResponse } from '@/interfaces/external/IOmdbResponse';
import { IMovieRepository, MovieSearchResult } from '@/interfaces/repositories/IMovieRepository';

@injectable()
export class MovieRepository implements IMovieRepository {
  private readonly _apiKey = env.omdb_api_key;
  private readonly _baseUrl = env.omdb_base_url;

  async searchMovies(query: string, page: number = 1): Promise<MovieSearchResult> {
    const response = await axios.get<OmdbSearchResponse>(this._baseUrl as string, {
      params: {
        apikey: this._apiKey,
        s: query.trim(),
        page: page,
      },
    });

    return MovieMapper.toSearchResult(response.data);
  }

  async getMovieDetails(imdbId: string): Promise<Movie | null> {
    const response = await axios.get<OmdbMovieDetails>(this._baseUrl as string, {
      params: {
        apikey: this._apiKey,
        i: imdbId,
      },
    });

    if (response.data.Response === 'False') {
      return null;
    }

    return MovieMapper.toEntity(response.data);
  }
}
