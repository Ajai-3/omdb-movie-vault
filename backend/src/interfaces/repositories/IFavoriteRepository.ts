export interface IFavoriteRepository {
  getAll(): Promise<string[]>;
  save(ids: string[]): Promise<void>;
}
