import { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';
import MovieCard from '../components/MovieCard';
import { useSearchParams } from 'react-router-dom';
import { useSearchMovies } from '../hooks/useSearchMovies';
import { Loader2, ChevronLeft, ChevronRight, SearchIcon } from 'lucide-react';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('query') || '';
  const initialPage = parseInt(searchParams.get('page') || '1');

  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const debouncedQuery = useDebounce(query, 600);

  const { movies, loading, error, totalResults, searchMovies } =
    useSearchMovies();

  useEffect(() => {
    searchMovies(debouncedQuery, page);
    
    const params: { query?: string; page?: string } = {};
    if (debouncedQuery) params.query = debouncedQuery;
    if (page > 1) params.page = page.toString();
    setSearchParams(params, { replace: true });
  }, [debouncedQuery, page, searchMovies, setSearchParams]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className='space-y-6'>
      {/* Hero Header */}
      <div className='relative pb-2 text-center'>
        <div className='absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full -z-10' />
        <h1 className='text-4xl md:text-6xl font-black mb-1 tracking-tight'>
          Search <span className='text-main'>Movie</span>
        </h1>
        <p className='text-[#808a80] text-xl max-w-2xl mx-auto leading-relaxed'>
          Search movies by name to see the movie details
        </p>
      </div>

      <div className='relative max-w-3xl mx-auto group'>
        <div className='absolute -inset-1 bg-gradient-to-r from-[#ABFF00]/0 via-[#ABFF00]/20 to-[#ABFF00]/0 rounded-2xl blur opacity-25 group-focus-within:opacity-100 transition duration-1000'></div>

        <div className='relative'>
          <SearchIcon className='absolute left-6 top-1/2 -translate-y-1/2 text-main text-2xl z-10' />
          <input
            type='text'
            placeholder='Search movies...'
            value={query}
            onChange={handleQueryChange}
            className='w-full bg-[#141814]/80 backdrop-blur-2xl border border-[#202620] rounded-2xl py-4 pl-16 pr-6 focus:outline-none focus:border-[#ABFF00]/50 transition-all text-xl placeholder-[#404a40]'
          />
        </div>
      </div>

      <div className='flex items-center justify-between min-h-[40px]'>
        {query && query.trim().length >= 3 && totalResults > 0 && !loading && (
          <p className='text-[#808a80] font-medium'>
            <span className='text-white'>{totalResults.toLocaleString()}</span>{' '}
            movies found
          </p>
        )}

        {totalPages > 1 && !loading && movies.length > 0 && (
          <div className='flex items-center gap-2 bg-[#141814] p-1.5 rounded-2xl border border-[#202620]'>
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className='p-2 hover:bg-[#202620] hover:text-main rounded-xl disabled:opacity-20 transition-all font-bold'
            >
              <ChevronLeft className='w-5 h-5' />
            </button>
            <span className='text-xs font-black px-4 bg-[#202620] h-9 flex items-center rounded-lg text-main'>
              Page {page} / {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className='p-2 hover:bg-[#202620] hover:text-main rounded-xl disabled:opacity-20 transition-all font-bold'
            >
              <ChevronRight className='w-5 h-5' />
            </button>
          </div>
        )}
      </div>

      {loading && (
        <div className='flex flex-col items-center justify-center py-20 gap-6'>
          <div className='relative'>
            <div className='w-16 h-16 border-4 border-[#ABFF00]/10 border-t-[#ABFF00] rounded-full animate-spin' />
            <Loader2 className='w-8 h-8 text-main absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse' />
          </div>
          <p className='text-main font-black text-xs uppercase tracking-[0.3em]'>
            Searching...
          </p>
        </div>
      )}

      {query &&
        query.trim().length >= 3 &&
        error &&
        !loading &&
        movies.length === 0 && (
          <div className='text-center py-24 space-y-4'>
            <div className='w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto'>
              <span className='text-red-500 text-2xl font-black'>!</span>
            </div>
            <p className='text-[#808a80] text-lg font-medium'>{error}</p>
            <p className='text-[#404a40] text-sm'>
              Try again with a different search query.
            </p>
          </div>
        )}

      {!loading && movies.length > 0 && (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8'>
          {movies.map((movie) => (
            <MovieCard key={movie.imdbId} movie={movie} />
          ))}
        </div>
      )}

      {totalPages > 1 && !loading && movies.length > 0 && (
        <div className='flex justify-center pt-10 pb-20'>
          <div className='flex items-center gap-4 bg-[#141814] p-2 rounded-2xl border border-[#202620]'>
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className='px-6 py-3 hover:bg-[#202620] hover:text-[#ABFF00] rounded-xl disabled:opacity-20 transition-all flex items-center gap-2 font-black text-xs uppercase tracking-widest'
            >
              <ChevronLeft className='w-4 h-4' /> Previous Page
            </button>
            <div className='w-px h-6 bg-[#202620]' />
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className='px-6 py-3 hover:bg-[#202620] hover:text-[#ABFF00] rounded-xl disabled:opacity-20 transition-all flex items-center gap-2 font-black text-xs uppercase tracking-widest'
            >
              Next Page <ChevronRight className='w-4 h-4' />
            </button>
          </div>
        </div>
      )}

      {(!query || query.trim().length < 3) && !loading && (
        <div className='text-center relative overflow-hidden group'>
          <div className='absolute inset-0' />
          <p className='text-[#808a80] text-lg max-w-lg mx-auto relative z-10'>
            {query && query.trim().length > 0
              ? 'At least 3 charecter for search...'
              : 'Enter a movie name to start search.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
