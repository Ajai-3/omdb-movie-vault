import { TYPES } from '@/constants/types';
import { injectable, inject } from 'inversify';
import { NotFoundError } from '@/errors/CustomErrors';
import { ERROR_MESSAGES } from '@/constants/messages';
import { IMovieService } from '@/interfaces/services/IMovieService';
import { SearchMoviesDto, GetFavoritesDto } from '@/dtos/MovieRequestDto';
import { IMovieRepository } from '@/interfaces/repositories/IMovieRepository';
import { IFavoriteRepository } from '@/interfaces/repositories/IFavoriteRepository';

@injectable()
export class MovieService implements IMovieService {
  constructor(
    @inject(TYPES.IMovieRepository) private readonly _movieRepository: IMovieRepository,
    @inject(TYPES.IFavoriteRepository) private readonly _favoriteRepository: IFavoriteRepository,
  ) {}

  async searchMovies(dto: SearchMoviesDto) {
    const searchResult = await this._movieRepository.searchMovies(dto.query, dto.page);

    if (!searchResult.response) {
      if (searchResult.error === 'Too many results.') {
        return {
          movies: [],
          totalResults: 0,
          response: true,
          message: ERROR_MESSAGES.TOO_MANY_RESULTS,
        };
      }
      throw new NotFoundError(searchResult.error || ERROR_MESSAGES.NOT_FOUND);
    }

    const favoriteIds = await this._favoriteRepository.getAll();
    const detailedMovies = [];

    for (const movie of searchResult.movies) {
      try {
        const details = await this._movieRepository.getMovieDetails(movie.imdbId);
        if (details) {
          detailedMovies.push({
            ...details,
            isFavorite: favoriteIds.includes(movie.imdbId),
          });
        } else {
          detailedMovies.push({
            ...movie,
            isFavorite: favoriteIds.includes(movie.imdbId),
          });
        }
      } catch (error) {
        detailedMovies.push({
          ...movie,
          isFavorite: favoriteIds.includes(movie.imdbId),
        });
      }
    }

    return {
      movies: detailedMovies,
      totalResults: searchResult.totalResults,
      response: true,
    };
  }

  async getPaginatedFavorites(dto: GetFavoritesDto) {
    const allFavoriteIds = await this._favoriteRepository.getAll();
    
    const startIndex = (dto.page - 1) * dto.limit;
    const paginatedIds = allFavoriteIds.slice(startIndex, startIndex + dto.limit);
    
    const favoriteMovies = [];
    for (const id of paginatedIds) {
      try {
        const movie = await this._movieRepository.getMovieDetails(id);
        if (movie) {
          favoriteMovies.push({ ...movie, isFavorite: true });
        }
      } catch (error) {
   
      }
    }

    return {
      movies: favoriteMovies,
      totalResults: allFavoriteIds.length,
    };
  }

  async getMoviesByIds(ids: string[]) {
    const movies = [];
    for (const id of ids) {
      try {
        const movie = await this._movieRepository.getMovieDetails(id);
        if (movie) {
          movies.push({ ...movie, isFavorite: true });
        }
      } catch (error) {

      }
    }
    return movies;
  }
}
