import { useState, useCallback } from 'react';
import ApiClient from '../api/Axios';
import { API_ROUTES } from '../constants/routes';
import type { Movie } from '../types/movie.types';

export const useSearchMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);

  const searchMovies = useCallback(async (query: string, page: number = 1) => {
    if (!query || query.trim().length < 3) {
      setMovies([]);
      setTotalResults(0);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data: response } = await ApiClient.get(API_ROUTES.SEARCH, {
        params: { q: query.trim(), page },
      });

      if (response.status) {
        setMovies(response.data.movies || []);
        setTotalResults(response.data.pagination.totalResults || 0);
      } else {
        setMovies([]);
        setTotalResults(0);
        setError(response.message || 'No results found');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      setError(message);
      setMovies([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  }, []);

  return { movies, loading, error, totalResults, searchMovies };
};
