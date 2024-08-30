import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import Navbar from './Navbar';
import '../styles.css';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

const Watchlist: React.FC = () => {
  const [watchlistMovies, setWatchlistMovies] = useState<Movie[]>([]);

  useEffect(() => {
    // Retrieve the watchlist from localStorage
    const savedWatchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    setWatchlistMovies(savedWatchlist);
  }, []);

  const handleWatchlistToggle = (movie: Movie) => {
    // Remove the movie from the watchlist
    const updatedWatchlist = watchlistMovies.filter(watchMovie => watchMovie.id !== movie.id);
    setWatchlistMovies(updatedWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
  };

  const handleFavoriteToggle = (movie: Movie) => {
    // If you need to implement the favorite toggle, do so here.
    // This is a placeholder function.
    console.log(`${movie.title} favorite toggled`);
  };

  return (
    <div className="watchlist-page">
      <Navbar />
      <div className="content">
        <h2 className="section-title">My Watchlist</h2>
        <div className="movie-grid">
          {watchlistMovies.length > 0 ? (
            watchlistMovies.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onWatchlistToggle={handleWatchlistToggle}
                onFavoriteToggle={handleFavoriteToggle} // Include the favorite toggle function
              />
            ))
          ) : (
            <p className="empty-message">No movies in your watchlist yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
