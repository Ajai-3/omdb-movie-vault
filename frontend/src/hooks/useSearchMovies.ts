import { useState, useCallback } from 'react';
import apiClient from '../api/Axios';
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
      const { data: apiResponse } = await apiClient.get(API_ROUTES.SEARCH, {
        params: { query: query.trim(), page },
      });

      if (apiResponse.status) {
        setMovies(apiResponse.data.movies || []);
        setTotalResults(apiResponse.data.pagination.totalResults || 0);
      } else {
        setMovies([]);
        setTotalResults(0);
        setError(apiResponse.message || 'No results found');
      }
    } catch (searchError: unknown) {
      const errorMessage = searchError instanceof Error ? searchError.message : 'Something went wrong';
      setError(errorMessage);
      setMovies([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  }, []);

  return { movies, loading, error, totalResults, searchMovies };
};
