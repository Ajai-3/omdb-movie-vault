import { Movie } from '@/entities/Movie';
import { OmdbMovieDetails, OmdbSearchItem, OmdbSearchResponse } from '@/interfaces/external/IOmdbResponse';

export interface SearchResponse {
  movies: Movie[];
  totalResults: number;
  response: boolean;
  message?: string;
}

export class MovieMapper {
  static toEntity(apiData: Partial<OmdbMovieDetails> & Partial<OmdbSearchItem>, isFavorite: boolean = false): Movie {
    return {
      imdbId: apiData.imdbID || '',
      title: apiData.Title || 'Unknown',
      year: apiData.Year || 'N/A',
      type: apiData.Type || 'movie',
      poster: apiData.Poster || 'N/A',
      imdbRating: (apiData as OmdbMovieDetails).imdbRating || 'N/A',
      isFavorite,
    };
  }

  static toSearchResult(apiData: OmdbSearchResponse): { movies: Movie[]; totalResults: number; response: boolean; error?: string } {
    return {
      movies: (apiData.Search || []).map(item => this.toEntity(item)),
      totalResults: parseInt(apiData.totalResults || '0'),
      response: apiData.Response === 'True',
      error: apiData.Error,
    };
  }
}
