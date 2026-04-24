export interface MovieDto {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
  imdbRating?: string;
  isFavorite?: boolean;
}

export interface SearchResponseDto {
  Search?: MovieDto[];
  totalResults?: string;
  Response: string;
  Error?: string;
}
