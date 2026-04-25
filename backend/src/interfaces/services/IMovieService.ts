import { Movie } from '@/entities/Movie';
import { SearchMoviesDto, GetFavoritesDto } from '@/dtos/MovieRequestDto';
import { SearchResponse } from '@/mappers/MovieMapper';

export interface IMovieService {
  searchMovies(dto: SearchMoviesDto): Promise<SearchResponse>;
  getPaginatedFavorites(dto: GetFavoritesDto): Promise<{ movies: Movie[]; totalResults: number }>;
  getMoviesByIds(ids: string[]): Promise<Movie[]>;
}
