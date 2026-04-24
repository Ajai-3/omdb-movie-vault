import { useState } from 'react';
import apiClient from '../api/Axios';
import { API_ROUTES } from '../constants/routes';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addFavoriteId, removeFavoriteId } from '../store/movieSlice';
import { toast } from 'react-toastify';

export const useToggleFavorite = () => {
  const [isToggling, setIsToggling] = useState(false);
  const dispatch = useAppDispatch();
  const favoriteIds = useAppSelector((state) => state.movies.favoriteIds);

  const toggleFavorite = async (movieId: string, movieTitle?: string) => {
    setIsToggling(true);
    try {
      const { data: apiResponse } = await apiClient.post(API_ROUTES.FAVORITES, { id: movieId });
      
      if (apiResponse.status) {
        if (apiResponse.data.isFavorite) {
          dispatch(addFavoriteId(movieId));
          toast.success(`${movieTitle || 'Movie'} added to favorites`);
        } else {
          dispatch(removeFavoriteId(movieId));
          toast.success(`${movieTitle || 'Movie'} removed from favorites`);
        }
      }
    } catch (toggleError: unknown) {
      // Error is already handled by Axios interceptor (toast)
      console.error('Failed to toggle favorite', toggleError);
    } finally {
      setIsToggling(false);
    }
  };

  const isFavorite = (movieId: string) => favoriteIds.includes(movieId);

  return { toggleFavorite, isFavorite, loading: isToggling };
};
