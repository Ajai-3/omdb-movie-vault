import { useCallback } from 'react';
import ApiClient from '../api/Axios';
import { API_ROUTES } from '../constants/routes';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  setFavorites,
  setFavoritesLoading,
  setFavoritesError,
  setFavoritesPagination,
} from '../store/movieSlice';

export const useGetFavorites = () => {
  const dispatch = useAppDispatch();
  const {
    favorites,
    favoritesLoading: loading,
    favoritesError: error,
    totalPages,
    totalCount,
  } = useAppSelector((state) => state.movies);

  const getFavorites = useCallback(
    async (page: number = 1, limit: number = 10) => {
      dispatch(setFavoritesLoading(true));
      dispatch(setFavoritesError(null));
      try {
        const { data: response } = await ApiClient.get(API_ROUTES.FAVORITES, {
          params: { page, limit },
        });

        if (response.status) {
          dispatch(setFavorites(response.data.movies || []));
          dispatch(
            setFavoritesPagination({
              totalCount: response.data.pagination.totalCount,
              totalPages: response.data.pagination.totalPages,
            }),
          );
        } else {
          dispatch(
            setFavoritesError(response.message || 'Failed to fetch favorites'),
          );
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Failed to fetch favorites';
        dispatch(setFavoritesError(message));
      } finally {
        dispatch(setFavoritesLoading(false));
      }
    },
    [dispatch],
  );

  return { favorites, loading, error, totalPages, totalCount, getFavorites };
};
