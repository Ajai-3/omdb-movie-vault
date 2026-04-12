import { useState, useCallback } from 'react';
import ApiClient from '../api/Axios';
import { API_ROUTES } from '../constants/routes';

export const useSearchMovies = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);

  const searchMovies = useCallback(async (query: string, page: number = 1) => {
    if (!query) {
      setMovies([]);
      setTotalResults(0);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data } = await ApiClient.get(API_ROUTES.SEARCH, {
        params: { q: query, page },
      });
      if (data.Response === 'True') {
        // ALWAYS replace results for discrete page navigation
        setMovies(data.Search || []);
        setTotalResults(parseInt(data.totalResults) || 0);
      } else {
        setMovies([]);
        setTotalResults(0);
        setError(data.Error || 'No results found');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  return { movies, loading, error, totalResults, searchMovies };
};
