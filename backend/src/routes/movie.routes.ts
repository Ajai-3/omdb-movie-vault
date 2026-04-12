import Router from 'express';
import { ROUTES } from '../constants/routes.js';
import { MovieController } from '../controllers/MovieController.js';

const router = Router();

const movieController = new MovieController();

router.get(ROUTES.MOVIES.SEARCH, movieController.searchMovie);
router.get(ROUTES.MOVIES.FAVORITES, movieController.getFavorites);
router.post(ROUTES.MOVIES.FAVORITES, movieController.toggleFavorite);

export default router;
