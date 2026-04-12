import { useEffect, useState, useCallback } from 'react';
import { useMovies } from '../hooks/useMovies';
import MovieCard from '../components/MovieCard';
import { Heart, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

const Favorites = () => {
  const { favorites, loading, error, getFavorites } = useMovies();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const fetchFavorites = useCallback(async (page: number) => {
    const result = await getFavorites(page, 10);
    setTotalPages(result.totalPages);
    setTotalCount(result.totalResults);
  }, [getFavorites]);

  useEffect(() => {
    fetchFavorites(currentPage);
  }, [currentPage, fetchFavorites]);

  const goToNext = () => setCurrentPage(p => Math.min(p + 1, totalPages));
  const goToPrev = () => setCurrentPage(p => Math.max(p - 1, 1));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Heart className="w-8 h-8 text-red-500 fill-current" />
          <h1 className="text-3xl font-bold font-display">Your Vault</h1>
          <span className="bg-slate-800 text-slate-400 px-3 py-1 rounded-full text-sm">
            {totalCount}
          </span>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center gap-4 bg-slate-800/50 p-1 rounded-xl border border-slate-700/50">
            <button
              onClick={goToPrev}
              disabled={currentPage === 1}
              className="p-2 hover:bg-slate-700 rounded-lg disabled:opacity-30 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-medium px-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={goToNext}
              disabled={currentPage === totalPages}
              className="p-2 hover:bg-slate-700 rounded-lg disabled:opacity-30 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-10 h-10 text-red-500 animate-spin" />
          <p className="text-slate-400">Opening the vault...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-20">
          <p className="text-red-400 text-lg">{error}</p>
        </div>
      )}

      {!loading && !error && favorites.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {favorites.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}

      {!loading && !error && favorites.length === 0 && (
        <div className="text-center py-20 bg-slate-800/20 rounded-[3rem] border border-dashed border-slate-700/50">
          <Heart className="w-16 h-16 text-slate-700 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-2">The vault is currently empty</h2>
          <p className="text-slate-500 max-w-sm mx-auto">
            Discover and save your favorite movies to build your personal collection.
          </p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
