import { useEffect, useState } from 'react';
import { useGetFavorites } from '../hooks/useGetFavorites';
import MovieCard from '../components/MovieCard';
import { Heart, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

const Favorites = () => {
  const { favorites, loading, error, totalPages, totalResults, getFavorites } =
    useGetFavorites();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getFavorites(currentPage, 10);
  }, [currentPage, getFavorites]);

  const goToNext = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  const goToPrev = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  return (
    <div className='space-y-8'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <Heart className='w-8 h-8 text-main fill-current' />
          <h1 className='text-3xl font-bold font-display'>Your Favorites</h1>
          <span className='bg-slate-800 text-slate-400 px-3 py-1 rounded-full text-sm'>
            {totalResults}
          </span>
        </div>

        {totalPages > 1 && (
          <div className='flex items-center gap-4 bg-slate-800/50 p-1 rounded-xl border border-slate-700/50'>
            <button
              onClick={goToPrev}
              disabled={currentPage === 1}
              className='p-2 hover:bg-slate-700 rounded-lg disabled:opacity-30 transition-all'
            >
              <ChevronLeft className='w-5 h-5' />
            </button>
            <span className='text-sm font-medium px-2'>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={goToNext}
              disabled={currentPage === totalPages}
              className='p-2 hover:bg-slate-700 rounded-lg disabled:opacity-30 transition-all'
            >
              <ChevronRight className='w-5 h-5' />
            </button>
          </div>
        )}
      </div>

      {loading && (
        <div className='flex flex-col items-center justify-center py-20 gap-4'>
          <Loader2 className='w-10 h-10 text-main animate-spin' />
          <p className='text-slate-400'>Opening the favorites...</p>
        </div>
      )}

      {error && (
        <div className='text-center py-20'>
          <p className='text-red-400 text-lg'>{error}</p>
        </div>
      )}

      {!loading && !error && favorites.length > 0 && (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
          {favorites.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}

      {!loading && !error && favorites.length === 0 && (
        <div className='text-center py-20'>
          <Heart className='w-16 h-16 text-slate-700 mx-auto mb-6' />
          <h2 className='text-2xl font-bold mb-2'>No favorites yet</h2>
        </div>
      )}
    </div>
  );
};

export default Favorites;
