import Router from 'express';
import { ROUTES } from '../constants/routes';
import { MovieController } from '../controllers/MovieController';
import { container } from '../inversify.config';
import { TYPES } from '../constants/types';
import { validate } from '../middleware/validate';
import { 
  searchMoviesSchema, 
  toggleFavoriteSchema, 
  getFavoritesSchema 
} from '../schemas/movie.schema';

const router = Router();

const movieController = container.get<MovieController>(TYPES.MovieController);

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
