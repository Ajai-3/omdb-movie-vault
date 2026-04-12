import { type Movie } from '../types/movie.types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface MovieState {
  favorites: Movie[];
  favoriteIds: string[];
  favoritesLoading: boolean;
  favoritesError: string | null;
  totalPages: number;
  totalResults: number;
}

const initialState: MovieState = {
  favorites: [],
  favoriteIds: [],
  favoritesLoading: false,
  favoritesError: null,
  totalPages: 0,
  totalResults: 0,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<Movie[]>) => {
      state.favorites = action.payload;
      state.favoriteIds = action.payload.map(m => m.imdbID);
    },
    setFavoritesPagination: (state, action: PayloadAction<{ totalPages: number; totalResults: number }>) => {
      state.totalPages = action.payload.totalPages;
      state.totalResults = action.payload.totalResults;
    },
    setFavoritesLoading: (state, action: PayloadAction<boolean>) => {
      state.favoritesLoading = action.payload;
    },
    setFavoritesError: (state, action: PayloadAction<string | null>) => {
      state.favoritesError = action.payload;
    },
    addFavoriteId: (state, action: PayloadAction<string>) => {
      if (!state.favoriteIds.includes(action.payload)) {
        state.favoriteIds.push(action.payload);
      }
    },
    removeFavoriteId: (state, action: PayloadAction<string>) => {
      state.favoriteIds = state.favoriteIds.filter((id) => id !== action.payload);
      state.favorites = state.favorites.filter((movie) => movie.imdbID !== action.payload);
    },
  },
});

export const { 
  setFavorites, 
  setFavoritesPagination,
  setFavoritesLoading,
  setFavoritesError,
  addFavoriteId, 
  removeFavoriteId 
} = movieSlice.actions;

export default movieSlice.reducer;
