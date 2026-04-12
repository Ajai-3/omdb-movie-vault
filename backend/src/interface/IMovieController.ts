import type { Request, Response, NextFunction } from 'express';

export interface IMovieController {
  searchMovie: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
  getFavorites: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
  toggleFavorite: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
}
