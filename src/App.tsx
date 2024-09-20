import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage';
import FavoriteMovies from './Components/FavoriteMovies';
import Watchlist from './Components/Watchlist';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  media_type?: string; // Optional media_type to avoid mismatches
}

const App: React.FC = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [watchlistMovies, setWatchlistMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const savedWatchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    setFavoriteMovies(savedFavorites);
    setWatchlistMovies(savedWatchlist);
  }, []);

  const handleFavoriteToggle = (movie: Movie) => {
    const updatedFavorites = favoriteMovies.some(favMovie => favMovie.id === movie.id)
      ? favoriteMovies.filter(favMovie => favMovie.id !== movie.id)
      : [...favoriteMovies, movie];

    setFavoriteMovies(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleWatchlistToggle = (movie: Movie) => {
    const updatedWatchlist = watchlistMovies.some(watchlistMovie => watchlistMovie.id === movie.id)
      ? watchlistMovies.filter(watchlistMovie => watchlistMovie.id !== movie.id)
      : [...watchlistMovies, movie];

    setWatchlistMovies(updatedWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/favorites"
          element={
            <FavoriteMovies
              favoriteMovies={favoriteMovies} // Pass favoriteMovies prop
              onFavoriteToggle={handleFavoriteToggle}
              onWatchlistToggle={handleWatchlistToggle}
            />
          }
        />
        <Route
          path="/watchlist"
          element={
            <Watchlist
              watchlistMovies={watchlistMovies} // Pass watchlistMovies prop
              onWatchlistToggle={handleWatchlistToggle}
              onFavoriteToggle={handleFavoriteToggle}
            />
          }
        />
        <Route path="/favorites" element={<FavoriteMovies />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
      <ToastContainer position="bottom-right" autoClose={3000} /> {/* Toast container */}
    </Router>
  );
};

export default App;
