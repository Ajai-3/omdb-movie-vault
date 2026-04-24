import { MovieDto } from '../dtos/MovieDto';

export interface MovieEntity {
  title: string;
  year: string;
  imdbID: string;
  type: string;
  poster: string;
  imdbRating: string;
  isFavorite?: boolean;
}

export class MovieMapper {
  static toEntity(apiData: any): MovieEntity {
    return {
      title: apiData.Title || 'Unknown',
      year: apiData.Year || 'N/A',
      imdbID: apiData.imdbID || '',
      type: apiData.Type || 'movie',
      poster: apiData.Poster || 'N/A',
      imdbRating: apiData.imdbRating || 'N/A',
    };
  }

  static toSearchResponse(apiData: any, enrichedMovies: MovieEntity[]) {
    return {
      movies: enrichedMovies,
      totalResults: apiData.totalResults || '0',
      Response: apiData.Response,
    };
  }
}
