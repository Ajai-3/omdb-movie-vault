import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Navbar from './components/Navbar';
import { Loader2 } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Favorites = lazy(() => import('./pages/Favorites'));
const NotFound = lazy(() => import('./pages/NotFound'));

const PageLoader = () => (
  <div className='min-h-[60vh] flex items-center justify-center'>
    <Loader2 className='w-12 h-12 text-[#ABFF00] animate-spin' />
  </div>
);

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className='min-h-screen bg-black text-[#E0E7E0]'>
          <ToastContainer 
            position='top-center'
            theme='dark'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Navbar />
          <main className='max-w-7xl mx-auto px-6 py-8'>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/favorites' element={<Favorites />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
