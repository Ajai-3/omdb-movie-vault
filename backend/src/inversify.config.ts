import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './constants/types';
import { IMovieRepository } from './interfaces/repositories/IMovieRepository';
import { MovieRepository } from './repositories/MovieRepository';
import { IFavoriteRepository } from './interfaces/repositories/IFavoriteRepository';
import { FavoriteRepository } from './repositories/FavoriteRepository';
import { IMovieService } from './interfaces/services/IMovieService';
import { MovieService } from './services/movie.service';
import { IFavoriteService } from './interfaces/services/IFavoriteService';
import { FavoriteService } from './services/favorite.service';
import { MovieController } from './controllers/MovieController';

const container = new Container();

container.bind<IMovieRepository>(TYPES.IMovieRepository).to(MovieRepository).inSingletonScope();
container.bind<IFavoriteRepository>(TYPES.IFavoriteRepository).to(FavoriteRepository).inSingletonScope();
container.bind<IMovieService>(TYPES.IMovieService).to(MovieService).inSingletonScope();
container.bind<IFavoriteService>(TYPES.IFavoriteService).to(FavoriteService).inSingletonScope();
container.bind<MovieController>(TYPES.MovieController).to(MovieController).inSingletonScope();

export { container };
