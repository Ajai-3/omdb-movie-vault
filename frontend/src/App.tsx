import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext';
import Navbar from './components/Navbar';
import { Loader2 } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Favorites = lazy(() => import('./pages/Favorites'));
const NotFound = lazy(() => import('./pages/NotFound'));

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
  </div>
);

const App = () => {
  return (
    <MovieProvider>
      <Router>
        <div className="min-h-screen bg-[#0f172a] text-slate-200">
          <Toaster 
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#1e293b',
                color: '#f8fafc',
                border: '1px solid #334155',
              },
            }} 
          />
          <Navbar />
          <main className="max-w-7xl mx-auto px-6 py-8">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </Router>
    </MovieProvider>
  );
};

export default App;