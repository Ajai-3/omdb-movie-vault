import type { Request, Response, NextFunction } from 'express';
import * as movieService from '@/services/movie.service';
import * as favoriteService from '@/services/favorite.service';
import { HttpStatus } from '@/constants/https-status';
import type { IMovieController } from '@/interface/IMovieController';

export class MovieController implements IMovieController {
  constructor() {}

  searchMovie = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { q, page, limit } = req.query;
      const p = page ? parseInt(page as string) : 1;
      const l = limit ? parseInt(limit as string) : 10;

      if (!q) {
        return res.status(HttpStatus.OK).json({
          status: true,
          message: 'Please provide a search query',
          data: { movies: [], pagination: { totalResults: 0, totalPages: 0, currentPage: p } }
        });
      }

      const data = await movieService.searchMovies(q as string, p);
      
      if (data.Response === 'False') {
        return res.status(HttpStatus.OK).json({
          status: false,
          message: data.Error || 'No movies found',
          data: {
            movies: [],
            pagination: {
              totalResults: 0,
              totalPages: 0,
              currentPage: p
            }
          }
        });
      }

      const favoriteIds = await favoriteService.getFavoriteIds();
      const enrichedMovies = (data.Search || []).map((movie: any) => ({
        ...movie,
        isFavorite: favoriteIds.includes(movie.imdbID)
      }));

      const totalResults = parseInt(data.totalResults);
      return res.status(HttpStatus.OK).json({
        status: true,
        message: 'Movies fetched successfully',
        data: {
          movies: enrichedMovies,
          pagination: {
            totalResults: totalResults,
            totalPages: Math.ceil(totalResults / l),
            currentPage: p
          }
        }
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
      const { page, limit } = req.query;
      const p = page ? parseInt(page as string) : 1;
      const l = limit ? parseInt(limit as string) : 10;

      const ids = await favoriteService.getFavoriteIds();
      
      if (ids.length === 0) {
        return res.status(HttpStatus.OK).json({
          status: true,
          message: 'Vault is empty',
          data: {
            movies: [],
            pagination: {
              totalResults: 0,
              totalPages: 0,
              currentPage: p
            }
          }
        });
      }

      const startIndex = (p - 1) * l;
      const paginatedIds = ids.slice(startIndex, startIndex + l);
      const movies = await movieService.getMoviesByIds(paginatedIds);

      return res.status(HttpStatus.OK).json({
        status: true,
        message: 'Favorites fetched successfully',
        data: {
          movies: movies,
          pagination: {
            totalResults: ids.length,
            totalPages: Math.ceil(ids.length / l),
            currentPage: p
          }
        }
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
      const { id } = req.body;
      if (!id) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          status: false,
          message: 'Movie ID is required',
          data: null
        });
      }

      const updatedIds = await favoriteService.toggleFavoriteId(id);
      const isAdded = updatedIds.includes(id);

      return res.status(HttpStatus.OK).json({
        status: true,
        message: isAdded ? 'Added to vault' : 'Removed from vault',
        data: { id, isFavorite: isAdded }
      });
    } catch (error) {
      next(error);
    }
  };
}
