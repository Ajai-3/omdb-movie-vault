import apiClient from '../api/Axios';
import { useState, useCallback } from 'react';
import { API_ROUTES } from '../constants/routes';
import { ERROR_MESSAGES, FAVORITE_MESSAGES } from '../constants/messages';
import type { Movie, ApiResponse } from '../types/movie.types';

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
      const { data: apiResponse } = await apiClient.get<ApiResponse<{ movies: Movie[]; pagination: { totalResults: number; totalPages: number; currentPage: number } }>>(API_ROUTES.SEARCH, {
        params: { query: query.trim(), page },
      });

      if (apiResponse.status) {
        setMovies(apiResponse.data.movies || []);
        setTotalResults(apiResponse.data.pagination.totalResults || 0);
        if ((apiResponse.data.movies || []).length === 0 && apiResponse.message) {
          setError(apiResponse.message);
        }
      } else {
        setMovies([]);
        setTotalResults(0);
        setError(apiResponse.message || FAVORITE_MESSAGES.RESULT_NOT_FOUND);
      }
    } catch (searchError: unknown) {
      const errorMessage = searchError instanceof Error ? searchError.message : ERROR_MESSAGES.GENERAL;
      setError(errorMessage);
      setMovies([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  }, []);

  return { movies, loading, error, totalResults, searchMovies };
};
