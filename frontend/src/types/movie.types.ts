export interface Movie {
  imdbId: string;
  title: string;
  year: string;
  type: string;
  poster: string;
  imdbRating: string;
  isFavorite: boolean;
}

export interface MovieSearchResult {
  movies: Movie[];
  totalResults: number;
  currentPage: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  status: boolean;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  status: false;
  message: string;
}
