export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
  imdbRating?: string;
  isFavorite?: boolean;
}

export interface MovieSearchResult {
  movies: Movie[];
  totalResults: number;
  currentPage: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  statusCode: number;
}
