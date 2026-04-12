export interface Movie {
  imdbID: string;
  title: string;
  year: string;
  type: string;
  poster: string;
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
