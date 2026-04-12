import { useState } from 'react';
import ApiClient from '../api/Axios';
import { API_ROUTES } from '../constants/routes';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addFavoriteId, removeFavoriteId } from '../store/movieSlice';
import { toast } from 'react-toastify';

export const useToggleFavorite = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const favoriteIds = useAppSelector((state) => state.movies.favoriteIds);

  const toggleFavorite = async (id: string, title?: string) => {
    setLoading(true);
    try {
      const { data: response } = await ApiClient.post(API_ROUTES.FAVORITES, { id });
      
      if (response.status) {
        if (response.data.isFavorite) {
          dispatch(addFavoriteId(id));
          toast.success(`${title || 'Movie'} added to favorites`);
        } else {
          dispatch(removeFavoriteId(id));
          toast.success(`${title || 'Movie'} removed from favorites`);
        }
      }
    } catch (err: unknown) {
      let message = 'Failed to update favorites';
      if (err instanceof Error) message = err.message;
      toast.error(message);
      console.error('Failed to toggle favorite', err);
    } finally {
      setLoading(false);
    }
  };

  const isFavorite = (id: string) => favoriteIds.includes(id);

  return { toggleFavorite, isFavorite, loading };
};
