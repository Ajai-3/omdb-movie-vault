import { z } from 'zod';
import { ERROR_MESSAGES } from '../constants/messages';

export const searchMoviesSchema = z.object({
  query: z.object({
    query: z.string({
      error: ERROR_MESSAGES.PROVIDE_SEARCH_QUERY,
    }).min(1, ERROR_MESSAGES.PROVIDE_SEARCH_QUERY),
    page: z.string().optional().transform((val) => (val ? parseInt(val) : 1)),
    limit: z.string().optional().transform((val) => (val ? parseInt(val) : 10)),
  }),
});

export const toggleFavoriteSchema = z.object({
  body: z.object({
    id: z.string({
      error: ERROR_MESSAGES.MOVIE_ID_REQUIRED,
    }).min(1, ERROR_MESSAGES.MOVIE_ID_REQUIRED),
  }),
});

export const getFavoritesSchema = z.object({
  query: z.object({
    page: z.string().optional().transform((val) => (val ? parseInt(val) : 1)),
    limit: z.string().optional().transform((val) => (val ? parseInt(val) : 10)),
  }),
});
