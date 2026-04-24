import { useCallback } from 'react';
import apiClient from '../api/Axios';
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
    totalResults,
  } = useAppSelector((state) => state.movies);

  const getFavorites = useCallback(
    async (currentPage: number = 1, limitAmount: number = 10) => {
      dispatch(setFavoritesLoading(true));
      dispatch(setFavoritesError(null));
      try {
        const { data: apiResponse } = await apiClient.get(API_ROUTES.FAVORITES, {
          params: { page: currentPage, limit: limitAmount },
        });

        if (apiResponse.status) {
          dispatch(setFavorites(apiResponse.data.movies || []));
          dispatch(
            setFavoritesPagination({
              totalResults: apiResponse.data.pagination.totalResults,
              totalPages: apiResponse.data.pagination.totalPages,
            }),
          );
        } else {
          dispatch(
            setFavoritesError(apiResponse.message || 'Failed to fetch favorites'),
          );
        }
      } catch (fetchError: unknown) {
        const errorMessage =
          fetchError instanceof Error ? fetchError.message : 'Failed to fetch favorites';
        dispatch(setFavoritesError(errorMessage));
      } finally {
        dispatch(setFavoritesLoading(false));
      }
    },
    [dispatch],
  );

  return { favorites, loading, error, totalPages, totalResults, getFavorites };
};
