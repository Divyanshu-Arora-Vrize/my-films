import React, { useEffect,useState } from 'react';
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

interface WatchlistProps {
  watchlistMovies: Movie[];
  onWatchlistToggle: (movie: Movie) => void;
  onFavoriteToggle: (movie: Movie) => void;
}

const Watchlist: React.FC<WatchlistProps> = ({ watchlistMovies, onWatchlistToggle, onFavoriteToggle }) => {
  const [movies, setMovies] = useState<Movie[]>([]); // To handle search results

  useEffect(() => {
    // Simulating search or handling watchlist update
  }, [watchlistMovies]);

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
              onWatchlistToggle={onWatchlistToggle}
              onFavoriteToggle={onFavoriteToggle}
            />
          ))
        ) : watchlistMovies.length > 0 ? (
          watchlistMovies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onWatchlistToggle={onWatchlistToggle}
              onFavoriteToggle={onFavoriteToggle}
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
