import React, { useEffect, useState } from 'react';
import HomePage from './pages/HomePage'; // Adjust the path as needed
import { Movie } from './types'; // Adjust the path as necessary

const HomePageWrapper: React.FC = () => {
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    // Load favorites from local storage on initial render
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  });

  const [watchlist, setWatchlist] = useState<Movie[]>(() => {
    // Load watchlist from local storage on initial render
    return JSON.parse(localStorage.getItem('watchlist') || '[]');
  });

  const saveToLocalStorage = (key: string, data: Movie[]) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const handleFavoriteToggle = (movie: Movie) => {
    const isFavorite = favorites.some((favMovie) => favMovie.id === movie.id);

    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favorites.filter((favMovie) => favMovie.id !== movie.id);
      setFavorites(updatedFavorites);
      saveToLocalStorage('favorites', updatedFavorites);
    } else {
      // Add to favorites
      const updatedFavorites = [...favorites, movie];
      setFavorites(updatedFavorites);
      saveToLocalStorage('favorites', updatedFavorites);
    }
  };

  const handleWatchlistToggle = (movie: Movie) => {
    const isInWatchlist = watchlist.some((wlMovie) => wlMovie.id === movie.id);

    if (isInWatchlist) {
      // Remove from watchlist
      const updatedWatchlist = watchlist.filter((wlMovie) => wlMovie.id !== movie.id);
      setWatchlist(updatedWatchlist);
      saveToLocalStorage('watchlist', updatedWatchlist);
    } else {
      // Add to watchlist
      const updatedWatchlist = [...watchlist, movie];
      setWatchlist(updatedWatchlist);
      saveToLocalStorage('watchlist', updatedWatchlist);
    }
  };

  return (
    <HomePage
      onFavoriteToggle={handleFavoriteToggle}
      onWatchlistToggle={handleWatchlistToggle}
    />
  );
};

export default HomePageWrapper;
