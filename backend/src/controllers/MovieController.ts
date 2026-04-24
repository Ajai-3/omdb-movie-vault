import type { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';
import { TYPES } from '../constants/types';
import { IMovieService } from '../interfaces/services/IMovieService';
import { IFavoriteService } from '../interfaces/services/IFavoriteService';
import { HttpStatus } from '../constants/https-status';
import { SUCCESS_MESSAGES } from '../constants/messages';
import { IMovieController } from '../interfaces/IMovieController';
import { SearchMoviesDto, GetFavoritesDto } from '../dtos/MovieRequestDto';

@injectable()
export class MovieController implements IMovieController {
  constructor(
    @inject(TYPES.IMovieService) private readonly _movieService: IMovieService,
    @inject(TYPES.IFavoriteService) private readonly _favoriteService: IFavoriteService,
  ) {}

  searchMovies = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { query, page, limit } = req.query as any;
      const searchDto: SearchMoviesDto = {
        query,
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : 10,
      };

      const data = await this._movieService.searchMovies(searchDto);

      return res.status(HttpStatus.OK).json({
        status: true,
        message: SUCCESS_MESSAGES.FETCHED_SUCCESSFULLY,
        data: {
          movies: data.movies,
          pagination: {
            totalResults: parseInt(data.totalResults),
            totalPages: Math.ceil(parseInt(data.totalResults) / searchDto.limit),
            currentPage: searchDto.page,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  };

  getFavorites = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { page, limit } = req.query as any;
      const favoriteDto: GetFavoritesDto = {
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : 10,
      };

      const data = await this._movieService.getPaginatedFavorites(favoriteDto);

      return res.status(HttpStatus.OK).json({
        status: true,
        message: SUCCESS_MESSAGES.FETCHED_SUCCESSFULLY,
        data: {
          movies: data.movies,
          pagination: {
            totalResults: data.totalResults,
            totalPages: Math.ceil(data.totalResults / favoriteDto.limit),
            currentPage: favoriteDto.page,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  };

  toggleFavorite = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { id: movieId } = req.body;
      const updatedIds = await this._favoriteService.toggleFavorite(movieId);
      const isFavorite = updatedIds.includes(movieId);

      return res.status(HttpStatus.OK).json({
        status: true,
        message: isFavorite
          ? SUCCESS_MESSAGES.FAVORITES_ADDED
          : SUCCESS_MESSAGES.FAVORITES_REMOVED,
        data: { id: movieId, isFavorite },
      });
    } catch (error) {
      next(error);
    }
  };
}
