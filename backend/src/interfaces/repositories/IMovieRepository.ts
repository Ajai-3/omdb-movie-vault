import { Movie } from "@/entities/Movie";

export interface MovieSearchResult {
  movies: Movie[];
  totalResults: number;
  response: boolean;
  error?: string;
}

export interface IMovieRepository {
  searchMovies(query: string, page: number): Promise<MovieSearchResult>;
  getMovieDetails(imdbId: string): Promise<Movie | null>;
}
