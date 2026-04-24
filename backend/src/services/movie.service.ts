import { injectable, inject } from 'inversify';
import { TYPES } from '../constants/types';
import { IMovieRepository } from '../interfaces/repositories/IMovieRepository';
import { IMovieService } from '../interfaces/services/IMovieService';
import { MovieMapper } from '../mappers/MovieMapper';
import { IFavoriteRepository } from '../interfaces/repositories/IFavoriteRepository';
import { NotFoundError } from '../errors/CustomErrors';
import { ERROR_MESSAGES } from '../constants/messages';
import { SearchMoviesDto, GetFavoritesDto } from '../dtos/MovieRequestDto';

@injectable()
export class MovieService implements IMovieService {
  constructor(
    @inject(TYPES.IMovieRepository) private readonly _movieRepository: IMovieRepository,
    @inject(TYPES.IFavoriteRepository) private readonly _favoriteRepository: IFavoriteRepository,
  ) {}

  async searchMovies(dto: SearchMoviesDto) {
    const apiData = await this._movieRepository.searchMovies(dto.query, dto.page);

    if (apiData.Response === 'False') {
      throw new NotFoundError(ERROR_MESSAGES.NOT_FOUND);
    }

    const favoriteIds = await this._favoriteRepository.getAll();
    const movies = apiData.Search || [];
    
    const detailedMovies = await Promise.all(
      movies.map(async (movie: any) => {
        const details = await this._movieRepository.getMovieDetails(movie.imdbID);
        const entity = MovieMapper.toEntity({ ...movie, ...details });
        return {
          ...entity,
          isFavorite: favoriteIds.includes(entity.imdbID),
        };
      }),
    );

    return MovieMapper.toSearchResponse(apiData, detailedMovies);
  }

  async getPaginatedFavorites(dto: GetFavoritesDto) {
    const allFavoriteIds = await this._favoriteRepository.getAll();
    
    const startIndex = (dto.page - 1) * dto.limit;
    const paginatedIds = allFavoriteIds.slice(startIndex, startIndex + dto.limit);
    
    const movieRequests = paginatedIds.map((id) => this._movieRepository.getMovieDetails(id));
    const movieResponses = await Promise.all(movieRequests);
    
    const favoriteMovies = movieResponses.map((movie) => {
      const entity = MovieMapper.toEntity(movie);
      return { ...entity, isFavorite: true };
    });

    return {
      movies: favoriteMovies,
      totalResults: allFavoriteIds.length,
    };
  }

  async getMoviesByIds(ids: string[]) {
    const requests = ids.map((id) => this._movieRepository.getMovieDetails(id));
    const responses = await Promise.all(requests);
    return responses.map((movie) => {
      const entity = MovieMapper.toEntity(movie);
      return { ...entity, isFavorite: true };
    });
  }
}
