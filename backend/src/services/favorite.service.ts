import { TYPES } from '@/constants/types';
import { injectable, inject } from 'inversify';
import { IFavoriteService } from '@/interfaces/services/IFavoriteService';
import { IFavoriteRepository } from '@/interfaces/repositories/IFavoriteRepository';

@injectable()
export class FavoriteService implements IFavoriteService {
  constructor(
    @inject(TYPES.IFavoriteRepository) private readonly _favoriteRepository: IFavoriteRepository,
  ) {}

  async getFavoriteIds(): Promise<string[]> {
    return this._favoriteRepository.getAll();
  }

  async toggleFavorite(id: string): Promise<string[]> {
    const ids = await this._favoriteRepository.getAll();
    const index = ids.indexOf(id);
    if (index === -1) {
      ids.unshift(id);
    } else {
      ids.splice(index, 1);
    }
    await this._favoriteRepository.save(ids);
    return ids;
  }
}
