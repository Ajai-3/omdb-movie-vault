export interface SearchMoviesDto {
  query: string;
  page: number;
  limit: number;
}

export interface ToggleFavoriteDto {
  id: string;
}

export interface GetFavoritesDto {
  page: number;
  limit: number;
}
