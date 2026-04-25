import Router from 'express';
import { TYPES } from '@/constants/types';
import { ROUTES } from '@/constants/routes';
import { validate } from '@/middleware/validate';
import { container } from '@/config/inversify.config';

import { IMovieController } from '@/interfaces/controller/IMovieController';
import {
  searchMoviesSchema,
  toggleFavoriteSchema,
  getFavoritesSchema
} from '@/schemas/movie.schema';

const router = Router();

const movieController = container.get<IMovieController>(TYPES.IMovieController);

router.get(
  ROUTES.MOVIES.SEARCH,
  validate(searchMoviesSchema),
  movieController.searchMovies
);

router.get(
  ROUTES.MOVIES.FAVORITES,
  validate(getFavoritesSchema),
  movieController.getFavorites
);

router.post(
  ROUTES.MOVIES.FAVORITES,
  validate(toggleFavoriteSchema),
  movieController.toggleFavorite
);

export default router;
