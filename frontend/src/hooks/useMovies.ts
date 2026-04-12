import { useState, useCallback } from 'react';
import ApiClient from '../api/Axios';
import { API_ROUTES } from '../constants/routes';
import { useMovieContext } from '../context/MovieContext';
import toast from 'react-hot-toast';

export const useMovies = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  
  const { favorites, setFavorites, favoriteIds, setFavoriteIds, refreshFavoriteIds } = useMovieContext();

  const searchMovies = useCallback(async (query: string, page: number = 1) => {
    if (!query) {
      setMovies([]);
      setTotalResults(0);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data: response } = await ApiClient.get(API_ROUTES.SEARCH, {
        params: { q: query, page },
      });
      
      if (response.status && response.data.movies.length > 0) {
        setMovies(response.data.movies);
        setTotalResults(response.data.pagination.totalResults);
      } else {
        setError(response.message || 'No results found');
        setMovies([]);
        setTotalResults(0);
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Something went wrong';
      setError(msg);
      setMovies([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  }, []);

  const getFavorites = useCallback(async (page: number = 1, limit: number = 10) => {
    setLoading(true);
    try {
      const { data: response } = await ApiClient.get(API_ROUTES.FAVORITES, {
        params: { page, limit }
      });
      
      if (response.status) {
        setFavorites(response.data.movies || []);
        // Also refresh IDs to be safe
        refreshFavoriteIds();
        return { 
          totalResults: response.data.pagination.totalResults,
          totalPages: response.data.pagination.totalPages
        };
      }
      return { totalResults: 0, totalPages: 0 };
    } catch (err: any) {
      console.error('Failed to fetch favorites', err);
      return { totalResults: 0, totalPages: 0 };
    } finally {
      setLoading(false);
    }
  }, [setFavorites, refreshFavoriteIds]);

  const toggleFavorite = async (id: string, title?: string) => {
    try {
      const { data: response } = await ApiClient.post(API_ROUTES.FAVORITES, { id });
      
      if (response.status) {
        // Sync IDs and state
        await refreshFavoriteIds();

        // Show toast
        if (response.message.includes('Added')) {
          toast.success(`${title || 'Movie'} added to vault`, {
            icon: '❤️',
          });
        } else {
          toast.success(`${title || 'Movie'} removed from vault`, {
            icon: '🗑️',
          });
        }
      }
    } catch (err: any) {
      toast.error('Failed to update vault');
      console.error('Failed to toggle favorite', err);
    }
  };

  const isFavorite = (id: string) => favoriteIds.includes(id);

  return {
    movies,
    loading,
    error,
    totalResults,
    searchMovies,
    getFavorites,
    toggleFavorite,
    isFavorite,
    favorites,
    favoriteIds
  };
};
