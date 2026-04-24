export interface IFavoriteService {
  getFavoriteIds(): Promise<string[]>;
  toggleFavorite(id: string): Promise<string[]>;
}
