import { useMovies } from '../hooks/useMovies';
import { Heart, Star, Calendar, Film } from 'lucide-react';

interface MovieProps {
  movie: {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
    imdbRating?: string;
  };
}

const MovieCard = ({ movie }: MovieProps) => {
  const { toggleFavorite, isFavorite } = useMovies();
  const favorite = isFavorite(movie.imdbID);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(movie.imdbID, movie.Title);
  };

  return (
    <div className="group relative glass-card">
      {/* Poster Image */}
      <div className="aspect-[2/3] overflow-hidden relative">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://images.unsplash.com/photo-1485846234645-a62644ef7467?q=80&w=2000&auto=format&fit=crop'}
          alt={movie.Title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D110D] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        {/* Favorite Button */}
        <button
          onClick={handleToggle}
          className={`absolute top-4 right-4 p-3 rounded-2xl backdrop-blur-md border transition-all duration-300 transform group-hover:scale-110 active:scale-95 z-20 ${
            favorite 
              ? 'bg-[#ABFF00] border-[#ABFF00] shadow-[0_0_15px_rgba(171,255,0,0.4)]' 
              : 'bg-black/40 border-white/10 hover:border-[#ABFF00]/50'
          }`}
        >
          <Heart 
            className={`w-5 h-5 transition-colors ${
              favorite ? 'text-black fill-black' : 'text-white'
            }`} 
          />
        </button>

        {/* Badge */}
        <div className="absolute top-4 left-4 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/5 flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#ABFF00] animate-pulse" />
          <span className="text-[10px] font-black uppercase text-white tracking-widest">{movie.Type}</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 space-y-3 relative">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-bold text-lg leading-tight group-hover:text-[#ABFF00] transition-colors line-clamp-2">
            {movie.Title}
          </h3>
        </div>
        
          <div className="flex items-center gap-4 text-xs font-medium text-[#808a80]">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{movie.Year}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#ABFF00]/10 rounded-md border border-[#ABFF00]/20">
              <Star className="w-3.5 h-3.5 text-[#ABFF00] fill-[#ABFF00]" />
              <span className="text-[#ABFF00] font-bold">{movie.imdbRating}</span>
            </div>
          </div>

        <button 
           onClick={handleToggle}
           className="w-full py-3 rounded-xl bg-[#202620] hover:bg-[#ABFF00] hover:text-black text-xs font-black uppercase tracking-widest transition-all mt-2"
        >
          {favorite ? 'Remove from Vault' : 'Secure to Vault'}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
