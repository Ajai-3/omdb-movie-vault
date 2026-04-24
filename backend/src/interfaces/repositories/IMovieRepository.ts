export interface IMovieRepository {
  searchMovies(query: string, page: number): Promise<any>;
  getMovieDetails(imdbId: string): Promise<any>;
}
