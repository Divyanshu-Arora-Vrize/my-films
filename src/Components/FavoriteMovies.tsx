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

const FavoriteMovies: React.FC = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

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
    <div className="favorite-movies">
        <Navbar />
      <h2>My Favorite Movies</h2>
      <div className="movie-grid">
        {favoriteMovies.length > 0 ? (
          favoriteMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} onFavoriteToggle={handleFavoriteToggle} />
          ))
        ) : (
          <p>No favorite movies yet.</p>
        )}
      </div>
    </div>
  );
};

export default FavoriteMovies;
