import { SearchMoviesDto, GetFavoritesDto } from '../../dtos/MovieRequestDto';

export interface IMovieService {
  searchMovies(dto: SearchMoviesDto): Promise<any>;
  getPaginatedFavorites(dto: GetFavoritesDto): Promise<{ movies: any[]; totalResults: number }>;
  getMoviesByIds(ids: string[]): Promise<any[]>;
}
