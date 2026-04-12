// src/components/MovieGrid.tsx

import React from 'react';
import { type Movie } from '../types/movie.types';
import MovieCard from './MovieCard';

interface Props {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
  totalResults: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  emptyMessage?: string;
}

const MovieGrid: React.FC = ({
  movies,
  isLoading,
  error,
  totalResults,
  currentPage,
  totalPages,
  onPageChange,
  emptyMessage = 'No movies found.',
}: Props) => {
  if (isLoading) {
    return (
      <div className='movie-grid__status'>
        <div className='spinner' aria-label='Loading' />
        <p>Searching movies…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='movie-grid__status movie-grid__status--error'>
        <p>{error}</p>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className='movie-grid__status'>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div>
      {totalResults > 0 && (
        <p className='movie-grid__count'>
          {totalResults} result{totalResults !== 1 ? 's' : ''} found
        </p>
      )}

      <div className='movie-grid'>
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='pagination'>
          <button
            className='pagination__btn'
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ← Prev
          </button>

          <span className='pagination__info'>
            Page {currentPage} of {totalPages}
          </span>

          <button
            className='pagination__btn'
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieGrid;
