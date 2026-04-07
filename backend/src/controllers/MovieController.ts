import type { Request, Response, NextFunction } from 'express';

export class MovieController {
  constructor() {}

  // Search movies
  // GET api/movies/search
  searchMovie = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    return res.send('Search movies');
  };

  // Get favorites
  // GET api/movies/favorites
  getFavorites = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    return res.send('Get favorites');
  };

  // Toggle favorite
  // POST api/movies/favorites
  toggleFavorite = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    return res.send('Toggle favorite');
  };
}
