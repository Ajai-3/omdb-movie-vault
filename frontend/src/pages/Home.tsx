import { useState, useEffect } from 'react';
import { useMovies } from '../hooks/useMovies';
import MovieCard from '../components/MovieCard';
import { Search, Loader2, ChevronLeft, ChevronRight, Zap } from 'lucide-react';

const Home = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const { movies, loading, error, totalResults, searchMovies } = useMovies();

  useEffect(() => {
    setPage(1);
    if (!query || query.trim().length < 3) {
      // Don't clear movies immediately to avoid flicker, 
      // but also don't search.
      return;
    }

    const timer = setTimeout(() => {
      searchMovies(query, 1);
    }, 600);
    return () => clearTimeout(timer);
  }, [query, searchMovies]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    searchMovies(query, newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className="space-y-12">
      {/* Hero Header */}
      <div className="relative pt-10 pb-4 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#ABFF00]/10 blur-[100px] rounded-full -z-10" />
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141814] border border-[#202620] mb-6 shadow-xl">
          <Zap className="w-4 h-4 text-[#ABFF00] fill-current" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#808a80]">Powered by OMDb Intelligence</span>
        </div>
        <h1 className="text-6xl md:text-7xl font-black mb-6 tracking-tight">
          Movie <span className="text-[#ABFF00]">Vault</span>
        </h1>
        <p className="text-[#808a80] text-xl max-w-2xl mx-auto leading-relaxed">
          The ultimate decentralized cinematic database. Search through millions 
          of titles and build your personal vault.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-3xl mx-auto group">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#ABFF00]/0 via-[#ABFF00]/20 to-[#ABFF00]/0 rounded-[2.2rem] blur opacity-25 group-focus-within:opacity-100 transition duration-1000"></div>
        <div className="relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#404a40] w-6 h-6 group-focus-within:text-[#ABFF00] transition-colors" />
          <input
            type="text"
            placeholder="Search titles, actors, or directors..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-[#141814]/80 backdrop-blur-2xl border border-[#202620] rounded-[2rem] py-6 pl-16 pr-6 focus:outline-none focus:border-[#ABFF00]/50 transition-all text-xl placeholder-[#404a40]"
          />
        </div>
      </div>

      <div className="flex items-center justify-between min-h-[40px]">
        {query && query.trim().length >= 3 && totalResults > 0 && !loading && (
          <p className="text-[#808a80] font-medium">
            Found <span className="text-white">{totalResults.toLocaleString()}</span> assets in the global index
          </p>
        )}
        
        {totalPages > 1 && !loading && movies.length > 0 && (
          <div className="flex items-center gap-2 bg-[#141814] p-1.5 rounded-2xl border border-[#202620]">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="p-2 hover:bg-[#202620] hover:text-[#ABFF00] rounded-xl disabled:opacity-20 transition-all font-bold"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-black px-4 bg-[#202620] h-9 flex items-center rounded-lg text-[#ABFF00]">
              NODE {page} / {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="p-2 hover:bg-[#202620] hover:text-[#ABFF00] rounded-xl disabled:opacity-20 transition-all font-bold"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-[#ABFF00]/10 border-t-[#ABFF00] rounded-full animate-spin" />
            <Loader2 className="w-8 h-8 text-[#ABFF00] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <p className="text-[#ABFF00] font-black text-xs uppercase tracking-[0.3em]">Decoding Streams...</p>
        </div>
      )}

      {query && query.trim().length >= 3 && error && !loading && movies.length === 0 && (
        <div className="text-center py-24 bg-[#141814] rounded-[3rem] border border-[#202620] space-y-4">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
             <span className="text-red-500 text-2xl font-black">!</span>
          </div>
          <p className="text-[#808a80] text-lg font-medium">{error}</p>
          <p className="text-[#404a40] text-sm">Refine your search parameters to re-scan the database.</p>
        </div>
      )}

      {!loading && movies.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}

      {totalPages > 1 && !loading && movies.length > 0 && (
        <div className="flex justify-center pt-10 pb-20">
           <div className="flex items-center gap-4 bg-[#141814] p-2 rounded-2xl border border-[#202620]">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-6 py-3 hover:bg-[#202620] hover:text-[#ABFF00] rounded-xl disabled:opacity-20 transition-all flex items-center gap-2 font-black text-xs uppercase tracking-widest"
            >
              <ChevronLeft className="w-4 h-4" /> Previous Node
            </button>
            <div className="w-px h-6 bg-[#202620]" />
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-6 py-3 hover:bg-[#202620] hover:text-[#ABFF00] rounded-xl disabled:opacity-20 transition-all flex items-center gap-2 font-black text-xs uppercase tracking-widest"
            >
              Next Node <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {(!query || query.trim().length < 3) && !loading && (
        <div className="text-center py-32 bg-[#141814] rounded-[3rem] border border-[#202620] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#ABFF00]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <h2 className="text-3xl font-black mb-4 relative z-10">Scan the <span className="text-[#ABFF00]">Global Index</span></h2>
          <p className="text-[#808a80] text-lg max-w-lg mx-auto relative z-10">
            {query && query.trim().length > 0 ? 'Provide at least 3 characters to begin scanning...' : 'Begin your journey by entering a search query above.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
