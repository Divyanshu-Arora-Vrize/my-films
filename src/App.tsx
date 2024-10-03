import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePageWrapper from './HomePageWrapper'; // Use HomePageWrapper from feat_useHasura
import FavoriteMovies from './Components/FavoriteMovies';
import Watchlist from './Components/Watchlist';
import PrivacyPolicy from './Components/PrivacyPolicy'; // Import Privacy Policy
import TermsAndConditions from './Components/TermsAndConditions'; // Import Terms and Conditions
import { ApolloWrapper } from './apolloClient'; // Import ApolloWrapper
import { Movie } from './types';

const App: React.FC = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  const handleFavoriteToggle = (movie: Movie) => {
    const isFavorite = favoriteMovies.some(favMovie => favMovie.id === movie.id);
    if (isFavorite) {
      setFavoriteMovies(prevMovies => prevMovies.filter(m => m.id !== movie.id));
    } else {
      setFavoriteMovies(prevMovies => [...prevMovies, movie]);
    }
  };

  const handleWatchlistToggle = (movie: Movie) => {
    const isOnWatchlist = watchlist.some(watchMovie => watchMovie.id === movie.id);
    if (isOnWatchlist) {
      setWatchlist(prevMovies => prevMovies.filter(m => m.id !== movie.id));
    } else {
      setWatchlist(prevMovies => [...prevMovies, movie]);
    }
  };

  return (
    <ApolloWrapper>
      <Router>
        <Routes>
          <Route path="/" element={<HomePageWrapper />} />
          <Route path="/favorites" element={
            <FavoriteMovies
              onFavoriteToggle={handleFavoriteToggle}
              onWatchlistToggle={handleWatchlistToggle}
            />
          } />
          <Route path="/watchlist" element={
            <Watchlist
              onFavoriteToggle={handleFavoriteToggle}
              onWatchlistToggle={handleWatchlistToggle}
            />
          } />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        </Routes>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </Router>
    </ApolloWrapper>
  );
};

export default App;
