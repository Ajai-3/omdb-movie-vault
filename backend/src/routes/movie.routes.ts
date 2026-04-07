import { MovieController } from '@/controllers/MovieController';
import Router from 'express';

const router = Router();

const movieController = new MovieController();

router.get('/search', movieController.searchMovie);
router.get('/favorites', movieController.getFavorites);
router.post('/favorites', movieController.toggleFavorite);

export default router;
