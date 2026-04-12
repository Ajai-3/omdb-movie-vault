import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import ApiClient from '../api/Axios';
import { API_ROUTES } from '../constants/routes';

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface MovieContextType {
  favorites: Movie[];
  favoriteIds: string[];
  setFavorites: (movies: Movie[]) => void;
  setFavoriteIds: (ids: string[]) => void;
  refreshFavoriteIds: () => Promise<void>;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const refreshFavoriteIds = useCallback(async () => {
    try {
      const { data: response } = await ApiClient.get(API_ROUTES.FAVORITES);
      if (response.status) {
        // We might need a specific endpoint to just get IDs if the list is huge,
        // but for now we'll assume the search response from favorites has them all or we add one.
        setFavoriteIds(response.data.movies.map((m: any) => m.imdbID));
      }
    } catch (err) {
      console.error('Failed to sync favorite IDs', err);
    }
  }, []);

  useEffect(() => {
    refreshFavoriteIds();
  }, [refreshFavoriteIds]);

  return (
    <MovieContext.Provider value={{ 
        favorites, 
        setFavorites, 
        favoriteIds, 
        setFavoriteIds, 
        refreshFavoriteIds 
    }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }
  return context;
};
