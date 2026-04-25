import { useState } from 'react';
import apiClient from '../api/Axios';
import { toast } from 'react-toastify';
import { API_ROUTES } from '../constants/routes';
import type { ApiResponse } from '../types/movie.types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addFavoriteId, removeFavoriteId } from '../store/movieSlice';
import { FAVORITE_MESSAGES } from '../constants/messages';

export const useToggleFavorite = () => {
  const [isToggling, setIsToggling] = useState(false);
  const dispatch = useAppDispatch();
  const favoriteIds = useAppSelector((state) => state.movies.favoriteIds);

  const toggleFavorite = async (movieId: string, movieTitle?: string) => {
    setIsToggling(true);
    try {
      const { data: apiResponse } = await apiClient.post<ApiResponse<{ id: string; isFavorite: boolean }>>(API_ROUTES.FAVORITES, { id: movieId });
      
      if (apiResponse.status) {
        if (apiResponse.data.isFavorite) {
          dispatch(addFavoriteId(movieId));
          toast.success(`${movieTitle || 'Movie'} ${FAVORITE_MESSAGES.ADDED_TO_FAVORITES}`);
        } else {
          dispatch(removeFavoriteId(movieId));
          toast.success(`${movieTitle || 'Movie'} ${FAVORITE_MESSAGES.REMOVED_FROM_FAVORITES}`);
        }
      }
    } catch (toggleError: unknown) {
      console.error('Failed to toggle favorite', toggleError);
    } finally {
      setIsToggling(false);
    }
  };

  const isFavorite = (movieId: string) => favoriteIds.includes(movieId);

  return { toggleFavorite, isFavorite, loading: isToggling };
};
