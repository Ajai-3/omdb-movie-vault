import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, Heart, CircleDot } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Overview', icon: LayoutGrid },
    { path: '/favorites', label: 'Vault', icon: Heart },
  ];

  return (
    <nav className="sticky top-0 z-50 py-4 px-6 border-b border-[#202620] bg-[#0D110D]/80 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[#ABFF00] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(171,255,0,0.3)] transition-transform group-hover:rotate-12">
            <CircleDot className="w-6 h-6 text-black" />
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase italic">
            Grass<span className="text-[#ABFF00]">Vault</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 p-1.5 bg-[#141814] border border-[#202620] rounded-2xl">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                location.pathname === item.path
                  ? 'bg-[#ABFF00] text-black shadow-[0_0_15px_rgba(171,255,0,0.2)]'
                  : 'text-[#808a80] hover:text-white hover:bg-[#202620]'
              }`}
            >
              <item.icon className={`w-4 h-4 ${location.pathname === item.path ? 'fill-current' : ''}`} />
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
