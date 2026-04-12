import { useState, useCallback } from 'react';
import ApiClient from '../api/Axios';
import { API_ROUTES } from '../constants/routes';
import { useMovieContext } from '../context/MovieContext';

export const useGetFavorites = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { favorites, setFavorites } = useMovieContext();

  const getFavorites = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await ApiClient.get(API_ROUTES.FAVORITES);
      setFavorites(data.Search || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch favorites');
    } finally {
      setLoading(false);
    }
  }, [setFavorites]);

  return { favorites, loading, error, getFavorites };
};
