import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from '@/constants/types';

import { MovieController } from '@/controllers/MovieController';
import { IMovieController } from '@/interfaces/controller/IMovieController';

import { MovieService } from '@/services/movie.service';
import { FavoriteService } from '@/services/favorite.service';
import { IMovieService } from '@/interfaces/services/IMovieService';
import { IFavoriteService } from '@/interfaces/services/IFavoriteService';

import { MovieRepository } from '@/repositories/MovieRepository';
import { FavoriteRepository } from '@/repositories/FavoriteRepository';
import { IMovieRepository } from '@/interfaces/repositories/IMovieRepository';
import { IFavoriteRepository } from '@/interfaces/repositories/IFavoriteRepository';



const container = new Container();

container.bind<IMovieService>(TYPES.IMovieService).to(MovieService).inSingletonScope();
container.bind<IFavoriteService>(TYPES.IFavoriteService).to(FavoriteService).inSingletonScope();
container.bind<IMovieController>(TYPES.IMovieController).to(MovieController).inSingletonScope();
container.bind<IMovieRepository>(TYPES.IMovieRepository).to(MovieRepository).inSingletonScope();
container.bind<IFavoriteRepository>(TYPES.IFavoriteRepository).to(FavoriteRepository).inSingletonScope();

export { container };
