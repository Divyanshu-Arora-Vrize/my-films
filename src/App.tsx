import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import HomePage from '../src/pages/HomePage';
import FavoriteMovies from '../src/Components/FavoriteMovies';
import Watchlist from '../src/Components/Watchlist';
import { ApolloWrapper } from './apolloClient';
import { Movie } from './types';
import HomePageWrapper from './HomePageWrapper';

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


          <Route
            path="/favorites"
            element={
              <FavoriteMovies
                onFavoriteToggle={handleFavoriteToggle}
                onWatchlistToggle={handleWatchlistToggle}
              />
            }
          />
          <Route
            path="/watchlist"
            element={
              <Watchlist
                onFavoriteToggle={handleFavoriteToggle}
                onWatchlistToggle={handleWatchlistToggle}
              />
            }
          />
        </Routes>
      </Router>
    </ApolloWrapper>
  );
};

export default App;
