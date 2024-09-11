import React, { useEffect,useState } from 'react';
import MovieCard from './MovieCard';
import Navbar from './Navbar';
import SearchBar from './SearchBar';
import Footer from './Footer';
import '../styles.css'; // Importing global styles

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

interface FavoriteMoviesProps {
  favoriteMovies: Movie[];
  onFavoriteToggle: (movie: Movie) => void;
  onWatchlistToggle: (movie: Movie) => void;
}

const FavoriteMovies: React.FC<FavoriteMoviesProps> = ({ favoriteMovies, onFavoriteToggle, onWatchlistToggle }) => {
  const [movies, setMovies] = useState<Movie[]>([]); // To handle search results

  useEffect(() => {
    // Simulating search or updating favoriteMovies when favorites change
  }, [favoriteMovies]);

  return (
    <div className="favorite-movies-page">
      <Navbar />
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to My Favorite Movies</h1>
          <p>Your favorite Movies & Series all in one place</p>
          <SearchBar setMovies={setMovies} /> {/* Search functionality */}
        </div>
      </div>

      <h2 className="section-title">Favorite Movies</h2>

      <div className="movie-grid">
        {movies.length > 0 ? (
          movies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onFavoriteToggle={onFavoriteToggle}
              onWatchlistToggle={onWatchlistToggle}
            />
          ))
        ) : favoriteMovies.length > 0 ? (
          favoriteMovies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onFavoriteToggle={onFavoriteToggle}
              onWatchlistToggle={onWatchlistToggle}
            />
          ))
        ) : (
          <p>No favorite movies yet.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default FavoriteMovies;
