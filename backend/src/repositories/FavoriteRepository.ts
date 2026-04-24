import fs from 'fs/promises';
import { injectable } from 'inversify';
import { IFavoriteRepository } from '../interfaces/repositories/IFavoriteRepository';

@injectable()
export class FavoriteRepository implements IFavoriteRepository {
  private readonly _filePath = 'favorites.json';

  async getAll(): Promise<string[]> {
    try {
      const data = await fs.readFile(this._filePath, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async save(ids: string[]): Promise<void> {
    await fs.writeFile(this._filePath, JSON.stringify(ids, null, 2), 'utf-8');
  }
}
