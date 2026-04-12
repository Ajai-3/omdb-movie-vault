import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, Heart } from 'lucide-react';
import { useEffect } from 'react';
import { useGetFavorites } from '../hooks/useGetFavorites';

const Navbar = () => {
  const location = useLocation();
  const { getFavorites } = useGetFavorites();

  useEffect(() => {
    getFavorites(1, 100);
  }, [getFavorites]);

  const navItems = [
    { path: '/', label: 'Home', icon: LayoutGrid },
    { path: '/favorites', label: 'Favorites', icon: Heart },
  ];

  return (
    <nav className='sticky top-0 z-50 py-2 px-4 border-b border-[#202620] bg-[#0D110D]/80 backdrop-blur-2xl'>
      <div className='max-w-7xl mx-auto flex items-center justify-between'>
        <Link to='/' className='flex items-center gap-3 group'>
          <span className='text-2xl tracking-tighter uppercase italic'>
            OMDB<span className='text-[#ABFF00]'> Movie Vault</span>
          </span>
        </Link>

        <div className='flex items-center gap-2 p-1.5 rounded-2xl'>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                location.pathname === item.path
                  ? 'bg-main text-black'
                  : 'text-[#808a80] hover:text-white hover:bg-[#202620]'
              }`}
            >
              <item.icon
                className={`w-4 h-4 ${location.pathname === item.path ? 'fill-current' : ''}`}
              />
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
