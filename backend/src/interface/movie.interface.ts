export interface IMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface ISearchResponse {
  Search?: IMovie[];
  totalResults?: string;
  Response: string;
  Error?: string;
}
