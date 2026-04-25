import { useToggleFavorite } from '../hooks/useToggleFavorite';
import { Heart, Star, Calendar } from 'lucide-react';
import type { Movie } from '../types/movie.types';

interface MovieProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieProps) => {
  const { toggleFavorite, isFavorite } = useToggleFavorite();
  const favorite = isFavorite(movie.imdbId);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(movie.imdbId, movie.title);
  };

  return (
    <div className='relative rounded-lg'>
      {/* Poster Image */}
      <div className='aspect-[2/3] overflow-hidden relative'>
        <img
          src={movie.poster !== 'N/A' ? movie.poster : ''}
          alt={movie.title}
          className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-[#0D110D] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity' />

        {/* Favorite Button */}
        <button
          onClick={handleToggle}
          className={`absolute top-4 right-4 p-3 rounded-2xl backdrop-blur-md transition-all duration-300 transform group-hover:scale-110 active:scale-95 z-20`}
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              favorite ? 'text-main fill-current' : 'text-white'
            }`}
          />
        </button>

        {/* Badge */}
        <div className='absolute top-4 left-4 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/5 flex items-center gap-1.5'>
          <div className='w-1.5 h-1.5 rounded-full bg-main animate-pulse' />
          <span className='text-[10px] font-black uppercase text-white tracking-widest'>
            {movie.type}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className='p-2 relative'>
        <div className='flex items-start justify-between gap-3 mb-1'>
          <h3 className='font-bold text-lg leading-tight group-hover:text-[#ABFF00] transition-colors line-clamp-2'>
            {movie.title}
          </h3>
        </div>

        <div className='flex items-center gap-4 text-xs font-medium text-[#808a80]'>
          <div className='flex items-center gap-1.5'>
            <Calendar className='w-3.5 h-3.5' />
            <span>{movie.year}</span>
          </div>
          <div className='flex items-center gap-1.5 px-2 py-0.5 bg-[#ABFF00]/10 rounded-md border border-[#ABFF00]/20'>
            <Star className='w-3.5 h-3.5 text-main fill-main' />
            <span className='text-main font-bold'>{movie.imdbRating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
