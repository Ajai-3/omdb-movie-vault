import { useState } from 'react';
import ApiClient from '../api/Axios';
import { API_ROUTES } from '../constants/routes';
import { useMovieContext } from '../context/MovieContext';

export const useToggleFavorite = () => {
  const [loading, setLoading] = useState(false);
  const { setFavorites, favorites } = useMovieContext();

  const toggleFavorite = async (id: string) => {
    setLoading(true);
    try {
      await ApiClient.post(API_ROUTES.FAVORITES, { id });
      // Refresh context state
      const { data } = await ApiClient.get(API_ROUTES.FAVORITES);
      setFavorites(data.Search || []);
    } catch (err: any) {
      console.error('Failed to toggle favorite', err);
    } finally {
      setLoading(false);
    }
  };

  const isFavorite = (id: string) => favorites.some(m => m.imdbID === id);

  return { toggleFavorite, isFavorite, loading };
};
