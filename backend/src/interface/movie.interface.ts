export interface IMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
  imdbRating?: string;
  isFavorite?: boolean;
}

export interface ISearchResponse {
  Search?: IMovie[];
  totalResults?: string;
  Response: string;
  Error?: string;
}
