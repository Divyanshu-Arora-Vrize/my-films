import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import Navbar from './Navbar';
import SearchBar from './SearchBar'; // Import the SearchBar component
import Footer from './Footer'; // Import Footer component
import '../styles.css';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

const FavoriteMovies: React.FC = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]); // To handle search results

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavoriteMovies(savedFavorites);
  }, []);

  const handleFavoriteToggle = (movie: Movie) => {
    const updatedFavorites = favoriteMovies.filter(favMovie => favMovie.id !== movie.id);
    setFavoriteMovies(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

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
            <MovieCard key={movie.id} movie={movie} onFavoriteToggle={handleFavoriteToggle} />
          ))
        ) : favoriteMovies.length > 0 ? (
          favoriteMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} onFavoriteToggle={handleFavoriteToggle} />
          ))
        ) : (
          <p>No favorite movies yet.</p>
        )}
      </div>

      <Footer /> {/* Add the Footer */}
    </div>
  );
};

export default FavoriteMovies;
