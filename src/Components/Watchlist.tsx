import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import Navbar from './Navbar';
import SearchBar from './SearchBar'; // Import SearchBar component
import Footer from './Footer'; // Import Footer component
import '../styles.css';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

const Watchlist: React.FC = () => {
  const [watchlistMovies, setWatchlistMovies] = useState<Movie[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]); // To handle search results

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
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isFavorite = favorites.some((favMovie: Movie) => favMovie.id === movie.id);

    if (isFavorite) {
      const updatedFavorites = favorites.filter((favMovie: Movie) => favMovie.id !== movie.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      favorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  };

  return (
    <div className="watchlist-page">
      <Navbar />
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to My Watchlist</h1>
          <p>All the movies and series you want to watch</p>
          <SearchBar setMovies={setMovies} /> {/* Search functionality */}
        </div>
      </div>

      <h2 className="section-title">My Watchlist</h2>

      <div className="movie-grid">
        {movies.length > 0 ? (
          movies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onWatchlistToggle={handleWatchlistToggle}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))
        ) : watchlistMovies.length > 0 ? (
          watchlistMovies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onWatchlistToggle={handleWatchlistToggle}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))
        ) : (
          <p className="empty-message">No movies in your watchlist yet.</p>
        )}
      </div>

      <Footer /> {/* Add the Footer */}
    </div>
  );
};

export default Watchlist;
